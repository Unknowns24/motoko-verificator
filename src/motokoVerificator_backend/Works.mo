import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

import Ic "Ic";
import Type "Types";
import Utils "Utils";
import Iter "mo:base/Iter";

module {
    type StudentProfile = Type.StudentProfile;
    public type TestResult = Type.TestResult;
    public type TestError = Type.TestError;
    public type WorkProgress = Type.WorkProgress;
    public type WorkProgressArgs = Type.WorkProgressArgs;

    public func test(canisterId : Principal, day: Nat) : async TestResult {
        let calculatorInterface = actor(Principal.toText(canisterId)) : actor {
            reset : shared () -> async Int;
            add : shared (x : Nat) -> async Int;
            sub : shared (x : Nat) -> async Int;
        };

        try {
            // Calculator verification
            if (day == 1) {
                let x1 : Int = await calculatorInterface.reset();
                if (x1 != 0) {
                    return #err(#UnexpectedValue("After a reset, counter should be 0!"));
                };

                let x2 : Int = await calculatorInterface.add(2);
                if (x2 != 2) {
                    return #err(#UnexpectedValue("After 0 + 2, counter should be 2!"));
                };

                let x3 : Int = await calculatorInterface.sub(2);
                if (x3 != 0) {
                    return #err(#UnexpectedValue("After 2 - 2, counter should be 0!"));
                };

                return #ok ();
            };

            // Homework diary verification
            if (day == 2) {

            };

            // MotoCoin verification 
            if (day == 3) {

            };

            // Student wall verification
            if (day == 4) {

            };

            return #err(#UnexpectedError("Invalid day number!"));
        } catch (e) {
            return #err(#UnexpectedError("Something went wrong!"));
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
        var totalDays = days.size();

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