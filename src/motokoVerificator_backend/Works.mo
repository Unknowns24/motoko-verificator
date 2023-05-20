import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

import Ic "Ic";
import Type "Types";
import Utils "Utils";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Error "mo:base/Error";

module {
    type StudentProfile = Type.StudentProfile;
    public type TestResult = Type.TestResult;
    public type TestError = Type.TestError;
    public type WorkProgress = Type.WorkProgress;
    public type WorkProgressArgs = Type.WorkProgressArgs;

    // Test Interfaces types
    public type Homework = Type.Homework;
    public type Content = Type.Content;
    public type Message = Type.Message;
    public type Account = Type.Account;

    public func test(canisterId : Principal, day: Nat) : async TestResult {
        let calculatorInterface = actor(Principal.toText(canisterId)) : actor {
            add : shared(x : Float) -> async Float;
            sub : shared(x : Float) -> async Float;
            mul : shared(x : Float) -> async Float;
            div : shared(x : Float) -> async ?Float; 
            reset: shared () -> async ();
            see: shared query () -> async Float;
            power: shared (x : Float) -> async Float;
            sqrt: shared () -> async Float;
            floor: shared () -> async Int;
        };

        let hwDiaryInterface = actor(Principal.toText(canisterId)) : actor {
            addHomework: shared (homework: Homework) -> async Nat;
            getHomework: shared query (id: Nat) -> async Result.Result<Homework, Text>;
            updateHomework: shared (id: Nat, homework: Homework) -> async Result.Result<(), Text>;
            markAsCompleted: shared (id: Nat) -> async Result.Result<(), Text>;
            deleteHomework: shared (id: Nat) -> async Result.Result<(), Text>;
            getAllHomework: shared query () -> async [Homework];
            getPendingHomework: shared query () -> async [Homework];
            searchHomework: shared query (searchTerm: Text) -> async [Homework];
        };
        
        let studentWallInterface = actor(Principal.toText(canisterId)) : actor {
            writeMessage: shared (c : Content) -> async Nat;
            getMessage: shared query (messageId : Nat) -> async Result.Result<Message, Text>;
            updateMessage: shared (messageId : Nat, c : Content) -> async Result.Result<(), Text>;
            deleteMessage: shared (messageId : Nat) -> async Result.Result<(), Text>;
            upVote: shared (messageId  : Nat) -> async Result.Result<(), Text>;
            downVote: shared (messageId  : Nat) -> async Result.Result<(), Text>;
            getAllMessages : query () -> async [Message];
            getAllMessagesRanked : query () -> async [Message];
        };

        let motoCoinInterface = actor(Principal.toText(canisterId)) : actor {
            name : shared query () -> async Text;
            symbol : shared query () -> async Text;
            totalSupply : shared query () -> async Nat;
            balanceOf : shared query (account : Account) -> async (Nat);
            transfer : shared (from: Account, to : Account, amount : Nat) -> async Result.Result<(), Text>;
            airdrop : shared () -> async Result.Result<(),Text>;
        };

        try {
            // Calculator verification
            if (day == 1) {
                // Reset test
                await calculatorInterface.reset();
                let resetRes : Float = await calculatorInterface.see();
                if (resetRes != 0.0 and resetRes != 0) {
                    return #err(#UnexpectedValue("After a reset, counter should be 0!"));
                };

                // Add test
                let addRes : Float = await calculatorInterface.add(2.5);
                if (addRes != 2.5) {
                    return #err(#UnexpectedValue("After 0 + 2.5, counter should be 2.5!"));
                };

                // Sub test
                let substractionRes : Float = await calculatorInterface.sub(0.5);
                if (substractionRes != 2 and substractionRes != 2.0) {
                    return #err(#UnexpectedValue("After 2.5 - 0.5, counter should be 2.0!"));
                };

                // Multiplication test
                let multiplicationRes : Float = await calculatorInterface.mul(2.0);
                if (multiplicationRes != 4 and multiplicationRes != 4.0) {
                    return #err(#UnexpectedValue("After 2 * 2, counter should be 4!"));
                };

                // Division test
                let divisionResult : ?Float = await calculatorInterface.div(2.0);
                switch(divisionResult) {
                    case(null) {
                        return #err(#UnexpectedValue("After 4 / 2, counter should not be null!"));
                    };
                    case(?divRes) { 
                        if (divRes != 2 and divRes != 2.0) {
                            return #err(#UnexpectedValue("After 4 / 2, counter should be 2!"));
                        };
                    };
                };
               
                // Power test
                let powerResult : Float = await calculatorInterface.power(8.0);
                if (powerResult != 256 and powerResult != 256.0) {
                    return #err(#UnexpectedValue("After 2 ** 8, counter should be 256!"));
                };

                // Square test
                let squareResult : Float = await calculatorInterface.sqrt();
                if (squareResult != 16 and squareResult != 16.0) {
                    return #err(#UnexpectedValue("After square of 256, counter should be 16!"));
                };

                // Floor test (add .3 to test the floor)
                ignore await calculatorInterface.add(0.3);
                let floorResult : Int = await calculatorInterface.floor();
                if (floorResult != 16) {
                    return #err(#UnexpectedValue("After floor of 16.3, counter should be 16!"));
                };
                
                return #ok ();
            };

            // Homework diary verification
            if (day == 2) {
                // helper functions
                func equalsHomeworks(h1 : Homework, h2 : Homework) : Bool {
                    return ((h1.title == h2.title) and (h1.description == h2.description) and (h1.dueDate == h2.dueDate) and (h1.completed == h2.completed))
                };

                func isHomeworkInArray(arr : [Homework], hw : Homework) : Bool {
                    for(actualHw in arr.vals()) {
                        if (equalsHomeworks(actualHw, hw)) {
                            return true
                        }
                    };

                    return false
                };

                func isHomeworkCompletedInArray(arr : [Homework]) : Bool {
                    for(actualHw in arr.vals()) {
                        if (actualHw.completed) {
                            return true;
                        }
                    };

                    return false;
                };

                // Add homework test
                let tHw = { title = "Test"; description = "Description Text"; dueDate = Time.now(); completed = true; };

                let hwIdRes : Nat = await hwDiaryInterface.addHomework(tHw);
                let getHomeworkResult : Result.Result<Homework, Text> = await hwDiaryInterface.getHomework(hwIdRes);

                switch(getHomeworkResult) {
                    case (#ok(returnedHw)) {
                        if (not equalsHomeworks(returnedHw, tHw)) {
                            return #err(#UnexpectedValue("the added homework and the returned homeworks are not equals"));
                        }
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue(errMsg));
                    };
                };

                // Update homework test
                let updatedHw = { title = "Test after update"; description = "Descriptions Text after update"; dueDate = Time.now(); completed = false; };

                ignore await hwDiaryInterface.updateHomework(hwIdRes, updatedHw);
                let getUpdatedHomeworkResult : Result.Result<Homework, Text> = await hwDiaryInterface.getHomework(hwIdRes);

                switch(getUpdatedHomeworkResult) {
                    case (#ok(returnedHw)) {
                        if (not equalsHomeworks(returnedHw, updatedHw)) {
                            return #err(#UnexpectedValue("the updated homework and the returned homeworks are not equals"));
                        }
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Homework update error: " # errMsg));
                    };
                };

                // Mark as completed test
                ignore await hwDiaryInterface.markAsCompleted(hwIdRes);
                let getCompletedHomework : Result.Result<Homework, Text> = await hwDiaryInterface.getHomework(hwIdRes);

                switch(getCompletedHomework) {
                    case (#ok(returnedHw)) {
                        if (not returnedHw.completed) {
                            return #err(#UnexpectedValue("Homework not completed after markAsCompleted!"));
                        }
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Homework complete error: " # errMsg));
                    };
                };
                
                // Get all homework test
                let otherHw = { title = "Test3"; description = "Description Text3"; dueDate = Time.now(); completed = false; };

                let otherHwId : Nat = await hwDiaryInterface.addHomework(otherHw);
                let getAllHwResult : [Homework] = await hwDiaryInterface.getAllHomework();
                
                if (getAllHwResult.size() < 2) {
                    return #err(#UnexpectedValue("Unexpected homework array size on getAllHomework!"));
                };

                // Get all pending homework test
                let getAllPendingHwResult : [Homework] = await hwDiaryInterface.getPendingHomework();
                
                if (getAllPendingHwResult.size() < 1) {
                    return #err(#UnexpectedValue("Unexpected homework array size on getPendingHomework!"));
                };

                if (isHomeworkCompletedInArray(getAllPendingHwResult)) {
                    return #err(#UnexpectedValue("Completed homeworks should not be returned on getPendingHomework!"));
                };
                
                // Search homework test
                let searchHomeworkResult : [Homework] = await hwDiaryInterface.searchHomework(otherHw.description);

                if (not isHomeworkInArray(searchHomeworkResult, otherHw)) {
                    return #err(#UnexpectedValue("Homework search should match with the gived value!"));
                };

                let newSearchHomeworkResult : [Homework] = await hwDiaryInterface.searchHomework(otherHw.title#otherHw.description);

                if (isHomeworkInArray(newSearchHomeworkResult, otherHw)) {
                    return #err(#UnexpectedValue("Homework search should not match with the gived value!"));
                };

                // Delete homework test
                ignore await hwDiaryInterface.deleteHomework(otherHwId);
                let getDeleteddHomework : Result.Result<Homework, Text> = await hwDiaryInterface.getHomework(otherHwId);

                switch(getDeleteddHomework) {
                    case (#ok(returnedHw)) {
                        if (equalsHomeworks(returnedHw, otherHw)) {
                            return #err(#UnexpectedValue("Homework not deleted after deleteHomework!"));
                        }
                    };

                    case (#err(errMsg)) { };
                };

                return #ok ();
            };

            // Student wall verification
            if (day == 3) {
                // helper functions 
                func equalsMessages(m1 : Message, m2 : Message) : Bool {
                    return (m1.content == m2.content) and (m1.vote == m2.vote) and (m1.creator == m2.creator)
                };

                func isMessageArrayRanked(arr : [Message]) : Bool {
                    var firstTime : Bool = true;
                    var lastValue : Int = 0;

                    for(item in arr.vals()) {
                        if (firstTime) {
                            lastValue := item.vote;
                        };

                        if (item.vote > lastValue) {
                            return false;
                        };

                        lastValue := item.vote;
                    };

                    return true;
                };

                // Write message test
                let textMsgContent : Content = #Text "Message content";
                let blobMsgContent : Content = #Image "\00\00\00\ff";
                let surveyMsgContent : Content = #Survey {
                    title = "Survey title";
                    answers = [("answer description", 8)];
                };

                let msgTextId : Nat = await studentWallInterface.writeMessage(textMsgContent);
                let msgBlobId : Nat = await studentWallInterface.writeMessage(blobMsgContent);
                let msgSurveyId : Nat = await studentWallInterface.writeMessage(surveyMsgContent);
                
                var receivedMsg : Message = {creator = canisterId; vote = 0; content = #Text ""};

                // Get message test
                let getMessageResult : Result.Result<Message, Text> = await studentWallInterface.getMessage(msgTextId); 
                switch(getMessageResult) {
                    case (#ok(message)) {
                        receivedMsg := message;
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Could not get the message after create it"));
                    }
                };

                if (receivedMsg.content != textMsgContent) {
                    return #err(#UnexpectedValue("created message content and returned message content are not equals"));
                };

                // Update message test
                ignore await studentWallInterface.updateMessage(msgTextId, blobMsgContent);

                let getUpdatedMessageResult : Result.Result<Message, Text> = await studentWallInterface.getMessage(msgTextId); 
                switch(getUpdatedMessageResult) {
                    case (#ok(message)) {
                        receivedMsg := message;
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Could not get the message after update it"));
                    }
                };

                if (receivedMsg.content != blobMsgContent) {
                    return #err(#UnexpectedValue("updated message content and returned message content are not equals"));
                };

                // Up vote test
                var votesBeforeUpVote : Int = receivedMsg.vote;
                
                ignore await studentWallInterface.upVote(msgTextId);
                let getUpVotedMessageResult = await studentWallInterface.getMessage(msgTextId); 

                switch(getUpVotedMessageResult) {
                    case (#ok(message)) {
                        receivedMsg := message;
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Could not get the message after upVote it"));
                    }
                };
                
                if (receivedMsg.vote != votesBeforeUpVote + 1) {
                    return #err(#UnexpectedValue("After upVote a message its votes should be increased by 1"));
                };

                // Down vote test
                ignore await studentWallInterface.downVote(msgTextId);
                let getDownVotedMessageResult = await studentWallInterface.getMessage(msgTextId); 

                switch(getDownVotedMessageResult) {
                    case (#ok(message)) {
                        receivedMsg := message;
                    };

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("Could not get the message after downVote it"));
                    }
                };
                
                if (receivedMsg.vote != votesBeforeUpVote) {
                    return #err(#UnexpectedValue("After downVote a message its votes should be decreased by 1"));
                };

                // Get all message test
                let getAllMessagesResult : [Message] = await studentWallInterface.getAllMessages();

                // Delete message test
                let deleteMessageResult : Result.Result<(), Text> = await studentWallInterface.deleteMessage(msgTextId);
                
                switch(deleteMessageResult) {
                    case (#ok()) {};

                    case (#err(errMsg)) {
                        return #err(#UnexpectedValue("After deleteMessage the message should be deleted!"));
                    }
                };

                let updatedGetAllMessagesResult : [Message] = await studentWallInterface.getAllMessages();

                if (updatedGetAllMessagesResult.size() != (getAllMessagesResult.size() - 1)) {
                    return #err(#UnexpectedValue("After deleteMessage the message should be deleted!"));
                };

                // Get all message ranked test
                ignore await studentWallInterface.upVote(msgBlobId);
                let getRankedMessagesResult : [Message] = await studentWallInterface.getAllMessagesRanked();

                if (not isMessageArrayRanked(getRankedMessagesResult)) {
                    return #err(#UnexpectedValue("Ranked array is not ordered!"));
                };

                return #ok ();
            };

            // MotoCoin verification 
            if (day == 4) {
                // This should be a random principal but i have not enought time :(
                let senderAccount : Account = {owner = Principal.fromText("bwk2m-qp2pw-grr4w-uyz4u-tig2m-cqu4v-nkkdx-zb67r-ialrl-iiuet-jae"); subaccount = null}; 
                let receiverAccount : Account = {owner = Principal.fromText("lrkbt-ld6ti-p5a4z-ngjcm-ewccu-hesqk-n6e2r-dzokj-vofn3-rucim-zqe"); subaccount = null}; 
                
                let name : Text = await motoCoinInterface.name();
                let symbol : Text = await motoCoinInterface.symbol();
                let totalSuply : Nat = await motoCoinInterface.totalSupply();
                let balanceOfAccountOne : Nat = await motoCoinInterface.balanceOf(senderAccount);

                ignore await motoCoinInterface.airdrop();

                let totalSuplyAfterAirdrop : Nat = await motoCoinInterface.totalSupply();
                let balanceOfAccountOneAfterAirdrop : Nat = await motoCoinInterface.balanceOf(senderAccount);

                if (totalSuply >= totalSuplyAfterAirdrop) {
                    return #err(#UnexpectedValue("After airdrop supply should increase!"));
                };

                if (balanceOfAccountOneAfterAirdrop != balanceOfAccountOne + 100) {
                    return #err(#UnexpectedValue("After airdrop balance of accounts should increase!"));
                };

                let balanceOfAccountTwo : Nat = await motoCoinInterface.balanceOf(receiverAccount);

                ignore await motoCoinInterface.transfer(senderAccount, receiverAccount, 100);

                let newBalanceOfAccountOne : Nat = await motoCoinInterface.balanceOf(senderAccount);
                let newBalanceOfAccountTwo : Nat = await motoCoinInterface.balanceOf(receiverAccount);

                if (newBalanceOfAccountOne != (balanceOfAccountOneAfterAirdrop - 100)) {
                    return #err(#UnexpectedValue("Account should be able to transfer, and its balance should decrease!"));
                };

                if (newBalanceOfAccountTwo != (balanceOfAccountTwo + 100)) {
                    return #err(#UnexpectedValue("Account balance should increase after transfer!"));
                };

                return #ok ();
            };

            return #err(#UnexpectedError("Invalid day number!"));
        } catch (e) {
            return #err(#UnexpectedError(Error.message(e)));
        } 
    };

    public func verifyOwnership(canisterId : Principal, p : Principal) : async Bool {
        try {
            let controllers = await Ic.getCanisterControllers(canisterId);

            var isOwner : ?Principal = Array.find<Principal>(controllers, func prin = prin == p);
            
            if (isOwner != null) {
                return true;
            };

            return false;
        } catch (e) {
            return false;
        }
    };

    public func getActualProgress(days : [[Principal]], user : Principal) : WorkProgress {
        var completedDays = 0;
        var totalDays = 4;

        // prevent 0 division !!!
        if (totalDays == 0) {
            totalDays += 1;
        }; 

        for(dayArray in days.vals()) {
            let dayCompleted = Utils.isPrincipalInNotOptionalArray(dayArray, user);

            if (dayCompleted) {
                completedDays += 1;
            }
        };

        return {
            progress = (completedDays * 100) / totalDays;
            graduate = completedDays == totalDays;
        }
    };
}