import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  public type Submission = {
    id : Text;
    name : Text;
    email : Text;
    projectType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Text.compare(submission1.id, submission2.id);
    };
  };

  let adminUsername = "suryanshswaraj100@gmail.com";
  let adminPassword = "surya_6745";
  let adminToken = "sk_admin_token_9f3a2b";

  var nextId = 1;

  let submissions = Map.empty<Text, Submission>();

  public shared ({ caller }) func submit(
    name : Text,
    email : Text,
    projectType : Text,
    message : Text,
  ) : async Text {
    let id = nextId.toText();
    let submission : Submission = {
      id;
      name;
      email;
      projectType;
      message;
      timestamp = Time.now();
    };

    submissions.add(id, submission);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAll() : async [Submission] {
    submissions.values().toArray().sort();
  };

  public query ({ caller }) func getById(id : Text) : async Submission {
    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Submission not found") };
      case (?submission) { submission };
    };
  };

  public shared ({ caller }) func adminLogin(username : Text, password : Text) : async Text {
    if (username == adminUsername and password == adminPassword) {
      adminToken;
    } else {
      Runtime.trap("Invalid credentials");
    };
  };

  public shared ({ caller }) func getSubmissions(token : Text) : async [Submission] {
    if (token == adminToken) {
      submissions.values().toArray().sort();
    } else {
      Runtime.trap("Unauthorized");
    };
  };

  public shared ({ caller }) func getSubmissionCount(token : Text) : async Nat {
    if (token == adminToken) {
      submissions.size();
    } else {
      Runtime.trap("Unauthorized");
    };
  };
};
