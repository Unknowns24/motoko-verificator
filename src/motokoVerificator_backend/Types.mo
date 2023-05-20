import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

module {
  public type StudentProfile = {
    cli : Text;
    name : Text;
    team : Text;
    graduate : Bool;
    progress : Nat;
  };

  public type SubmitsResult = {
    day1 : Nat;
    day2 : Nat;
    day3 : Nat;
    day4 : Nat;
  };

  public type WorkProgressArgs = {
    day1 : [StudentProfile];
    day2 : [StudentProfile];
    day3 : [StudentProfile];
    day4 : [StudentProfile];
  };

  public type WorkProgress = {
    graduate: Bool;
    progress: Nat;
  };

  public type TestResult = Result.Result<(), TestError>;
  public type TestError = {
    #UnexpectedValue : Text;
    #UnexpectedError : Text;
  };

  /*
   Needed types for testing
   all the days answers
  */
  
  // day 2
  public type Homework = {
    title : Text;
    description : Text;
    dueDate : Time.Time;
    completed : Bool;
  };

  // day 3 
  public type Content = {
    #Text : Text;
    #Image : Blob;
    #Survey : Survey;
  };

  public type Message = {
    content : Content;
    vote : Int;
    creator : Principal;
  };

  public type Answer = (
    description : Text, 
    numberOfVotes : Nat 
  );

  public type Survey = {
    title : Text; 
    answers : [Answer]; 
  };

  // day 4
  public type Subaccount = Blob;
  public type Account = {
    owner : Principal;
    subaccount : ?Subaccount;
  };
};
