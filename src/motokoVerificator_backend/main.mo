import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";

import Ic "Ic";
import Type "Types";
import Works "Works";
import Utils "Utils";

actor class Verifier() {
  // Types
  type StudentProfile = Type.StudentProfile;
  public type TestResult = Type.TestResult;
  public type TestError = Type.TestError;
  public type SubmitsResult = Type.SubmitsResult;

  //function to hash nats (needed for a hashmap with Nat as a Key)
  private func _hashNat(n : Nat) : Hash.Hash = return Text.hash(Nat.toText(n));

  // HashMaps declarations
  let daySubmitteds = HashMap.HashMap<Nat, [Principal]>(4, Nat.equal, _hashNat);
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

  public shared query ({ caller }) func imRegistered() : async Bool {
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

  // Works verifications
  public shared query func getDaysSubmits() : async SubmitsResult {    
    let day1 = Utils.getPrincipalArrayElements(daySubmitteds.get(1));
    let day2 = Utils.getPrincipalArrayElements(daySubmitteds.get(2));
    let day3 = Utils.getPrincipalArrayElements(daySubmitteds.get(3));
    let day4 = Utils.getPrincipalArrayElements(daySubmitteds.get(4));

    return {
      day1 = day1.size();
      day2 = day2.size();
      day3 = day3.size();
      day4 = day4.size();
    }
  };

  public shared ({ caller }) func verifyWork(canisterId : Text, day: Nat) : async Result.Result<(), Text> {
    try {
      //validate if user is registered
      var xProfile : ?StudentProfile = studentProfileStore.get(caller);

      switch (xProfile) {
        case (null) return #err("Not a registered user");

        case (?profile) {
          if (day < 1 or day > 4) {
            return #err("Invalid project day");
          };

          // Check if user have not already completed that day
          let haveCompletedThisDay = Utils.isPrincipalInArray(daySubmitteds.get(1), caller);

          if (haveCompletedThisDay) {
            return #err ("Day already submited");
          };

          // Check if owner and functionability
          let isApproved = await Works.test(Principal.fromText(canisterId), day); 

          switch(isApproved) {
            case (#err(#UnexpectedValue(errMsg))) {
              return #err(errMsg);
            };

            case (#err(#UnexpectedError(errMsg))) {
              return #err(errMsg);
            };
            case _ {};
          };

          let isOwner = await Works.verifyOwnership(Principal.fromText(canisterId), Principal.fromText(profile.cli)); 

          if (not isOwner) {
            return #err ("The received work owner does not match with the received principal");
          };

          // Adding principal as in the specified day submits
          var newArray = Utils.addPrincipalToArray(daySubmitteds.get(day), caller);
          ignore daySubmitteds.replace(day, newArray);

          // Getting student actual progress
          let progress = Works.getActualProgress(Utils.hashValsToArray(daySubmitteds.vals()), caller);

          var updatedStudent = {
            cli = profile.cli;
            name = profile.name;
            team = profile.team;
            graduate = progress.graduate;
            progress = progress.progress;
          };

          ignore studentProfileStore.replace(caller, updatedStudent);
          return #ok ();
        }
      };
    } catch(e) {
      return #err(Error.message(e));
    }
  };
};
