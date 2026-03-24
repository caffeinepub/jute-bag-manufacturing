import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
}
export interface ContactInfo {
    whatsapp: string;
    address: string;
    phone: string;
}
export interface Product {
    name: string;
    description: string;
    pricePerPiece: bigint;
    imageUrl: string;
    bulkPrice: bigint;
    category: string;
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getContactInfo(): Promise<ContactInfo>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    submitInquiry(inquiry: Inquiry): Promise<void>;
    updateContactInfo(info: ContactInfo): Promise<void>;
}
