import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Product = {
    name : Text;
    category : Text;
    description : Text;
    pricePerPiece : Nat;
    bulkPrice : Nat;
    imageUrl : Text;
  };

  type ContactInfo = {
    address : Text;
    phone : Text;
    whatsapp : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  // Product module for custom comparison (if needed later)
  module Product {
    public func compare(a : Product, b : Product) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  // Data storage
  let products = Map.empty<Text, Product>();

  var contactInfo : ?ContactInfo = null;

  let inquiries = List.empty<Inquiry>();

  // Product management
  public shared ({ caller }) func addProduct(product : Product) : async () {
    products.add(product.name, product);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().filter(func(p) { p.category == category }).toArray().sort();
  };

  // Contact info management
  public shared ({ caller }) func updateContactInfo(info : ContactInfo) : async () {
    contactInfo := ?info;
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    switch (contactInfo) {
      case (?info) { info };
      case (null) { Runtime.trap("Contact info not set") };
    };
  };

  // Inquiries
  public shared ({ caller }) func submitInquiry(inquiry : Inquiry) : async () {
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };
};
