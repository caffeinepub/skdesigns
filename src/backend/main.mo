import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type Submission = {
    id : Text;
    name : Text;
    email : Text;
    projectType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type PortfolioItem = {
    id : Text;
    title : Text;
    category : Text;
    description : Text;
    imageUrl : Text;
    order : Nat;
  };

  module PortfolioItem {
    public func compareOrder(item1 : PortfolioItem, item2 : PortfolioItem) : Order.Order {
      Nat.compare(item1.order, item2.order);
    };
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Text.compare(submission1.id, submission2.id);
    };
  };

  let adminUsername = "suryanshswaraj100@gmail.com";
  let adminPassword = "surya_6745";
  let adminToken = "sk_admin_secure_2026";

  var nextId = 1;
  var nextPortfolioId = 1;

  let submissions = Map.empty<Text, Submission>();
  let portfolioItems = Map.empty<Text, PortfolioItem>();

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

  // Portfolio management functions

  public query ({ caller }) func getPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort(PortfolioItem.compareOrder);
  };

  public shared ({ caller }) func addPortfolioItem(
    token : Text,
    title : Text,
    category : Text,
    description : Text,
    imageUrl : Text,
  ) : async Text {
    if (token != adminToken) {
      Runtime.trap("Unauthorized");
    };

    let id = nextPortfolioId.toText();
    let item : PortfolioItem = {
      id;
      title;
      category;
      description;
      imageUrl;
      order = nextPortfolioId;
    };

    portfolioItems.add(id, item);
    nextPortfolioId += 1;
    id;
  };

  public shared ({ caller }) func updatePortfolioItem(
    token : Text,
    id : Text,
    title : Text,
    category : Text,
    description : Text,
    imageUrl : Text,
  ) : async Bool {
    if (token != adminToken) {
      Runtime.trap("Unauthorized");
    };

    switch (portfolioItems.get(id)) {
      case (null) { false };
      case (?existingItem) {
        let updatedItem : PortfolioItem = {
          id;
          title;
          category;
          description;
          imageUrl;
          order = existingItem.order;
        };
        portfolioItems.add(id, updatedItem);
        true;
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(token : Text, id : Text) : async Bool {
    if (token != adminToken) {
      Runtime.trap("Unauthorized");
    };

    switch (portfolioItems.get(id)) {
      case (null) { false };
      case (?_) {
        portfolioItems.remove(id);
        true;
      };
    };
  };
};
