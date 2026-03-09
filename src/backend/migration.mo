import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  type Submission = {
    id : Text;
    name : Text;
    email : Text;
    projectType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type PortfolioItem = {
    id : Text;
    title : Text;
    category : Text;
    description : Text;
    imageUrl : Text;
    order : Nat;
  };

  type OldActor = {
    adminUsername : Text;
    adminPassword : Text;
    adminToken : Text;
    nextId : Nat;
    nextPortfolioId : Nat;
    submissions : Map.Map<Text, Submission>;
    portfolioItems : Map.Map<Text, PortfolioItem>;
  };

  type NewActor = {
    adminUsername : Text;
    adminPassword : Text;
    adminToken : Text;
    nextId : Nat;
    nextPortfolioId : Nat;
    submissions : Map.Map<Text, Submission>;
    portfolioItems : Map.Map<Text, PortfolioItem>;
  };

  public func run(old : OldActor) : NewActor {
    { old with adminToken = "sk_admin_secure_2026" };
  };
};
