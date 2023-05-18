import Principal "mo:base/Principal";
import Array "mo:base/Array";

import Type "Types";
import Ic "Ic";
import Nat "mo:base/Nat";


module {
    public type TestResult = Type.TestResult;
    public type TestError = Type.TestError;

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
}