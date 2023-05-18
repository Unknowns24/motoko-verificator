import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Timer "mo:base/Timer";
import Buffer "mo:base/Buffer";

import Type "Types";
import Ic "Ic";
import Works "Works";

actor class Verifier() {
  // Types
  type StudentProfile = Type.StudentProfile;
  public type TestResult = Type.TestResult;
  public type TestError = Type.TestError;
  public type SubmitsResult = Type.SubmitsResult;

  //function to hash nats (needed for a hashmap with Nat as a Key)
  private func _hashNat(n : Nat) : Hash.Hash = return Text.hash(Nat.toText(n));

  // HashMaps declarations
  let daySubmitteds = HashMap.HashMap<Nat, [Principal]>(0, Nat.equal, _hashNat);
  let studentProfileStore = HashMap.HashMap<Principal, StudentProfile>(0, Principal.equal, Principal.hash);

  // Profile stuff
  private func isRegistered(p : Principal) : Bool {
    var xProfile : ?StudentProfile = studentProfileStore.get(p);

    switch (xProfile) {
      case null { 
        return false;
      };

      case (?profile) {
        return true
      };
    }
  };

  public shared ({ caller }) func imRegistered() : async Bool {
    var xProfile : ?StudentProfile = studentProfileStore.get(caller);

    switch (xProfile) {
      case null { 
        return false;
      };

      case (?profile) {
        return true
      };
    }
  };

  public shared ({ caller }) func addMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
    if (Principal.isAnonymous(caller)) {
      return #err "You must be Logged In"
    };

    if (isRegistered(caller)) {
      return #err ("You are already registered (" # Principal.toText(caller) # ") ")
    };

    studentProfileStore.put(caller, profile);
    return #ok ();
  };

  public shared query ({ caller }) func seeAProfile(p : Principal) : async Result.Result<StudentProfile, Text> {
    var xProfile : ?StudentProfile = studentProfileStore.get(p);

    switch (xProfile) {
      case null { 
        return #err ("There is no profile registered with the received account");
      };

      case (?profile) {
        return #ok profile
      };
    }
  };

  public shared query ({ caller }) func seeMyProfile() : async Result.Result<StudentProfile, Text> {
    var xProfile : ?StudentProfile = studentProfileStore.get(caller);

    switch (xProfile) {
      case null { 
        return #err ("There is no profile registered with the received account");
      };

      case (?profile) {
        return #ok profile
      };
    }
  };

  public shared ({ caller }) func updateMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
    if (Principal.isAnonymous(caller)) {
      return #err "You must be Logged In"
    };
    
    if (not isRegistered(caller)) {
      return #err ("You are not registered");
    };

    ignore studentProfileStore.replace(caller, profile);

    return #ok ();
  };

  public shared ({ caller }) func deleteMyProfile() : async Result.Result<(), Text> {
    if (Principal.isAnonymous(caller)) {
      return #err "You must be Logged In"
    };
    
    if (not isRegistered(caller)) {
      return #err ("You are not registered");
    };

    studentProfileStore.delete(caller);

    return #ok ();
  };

  private func getArrayElements(arr : ?[Principal]) : [Principal] {
    switch(arr) {
      case (null) return [];
      case (?existentArray) {
        return existentArray
      };
    };
  };

  // Works verifications
  public query func getSubmits() : async SubmitsResult {    
    let day1 = getArrayElements(daySubmitteds.get(1));
    let day2 = getArrayElements(daySubmitteds.get(2));
    let day3 = getArrayElements(daySubmitteds.get(3));
    let day4 = getArrayElements(daySubmitteds.get(4));

    return {
      day1 = day1.size();
      day2 = day2.size();
      day3 = day3.size();
      day4 = day4.size();
    }
  };

  public shared ({ caller }) func verifyWork(canisterId : Principal, day: Nat) : async Result.Result<(), Text> {
    try {
      if (day < 1 or day > 4) {
        return #err("Invalid project day");
      };

      // Check if work owner and functionability
      let isApproved = await Works.test(canisterId, day); 

      if (isApproved != #ok) {
        return #err("The current work has no passed the tests");
      };

      let isOwner = await Works.verifyOwnership(canisterId, caller); 

      if (not isOwner) {
        return #err ("The received work owner does not match with the received principal");
      };

      //validate if user is registered
      var xProfile : ?StudentProfile = studentProfileStore.get(caller);

      switch (xProfile) {
        case (null) return #err("The received principal does not belongs to a registered student");

        case (?profile) {
          var updatedStudent = {
            name = profile.name;
            graduate = true;
            team = profile.team;
          };

          ignore studentProfileStore.replace(caller, updatedStudent);
          return #ok ();      
        }
      };
    } catch(e) {
      return #err("Cannot verify the project");
    }
  };
};
