import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  ChevronRight,
  Factory,
  Globe,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Recycle,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useGetAllProducts, useSubmitInquiry } from "./hooks/useQueries";

const SAMPLE_CATEGORIES = [
  {
    id: 1,
    name: "Shopping Bags",
    image: "/assets/generated/bag-shopping.dim_400x400.jpg",
    description: "Durable everyday carry bags",
    price: "₹120/pc",
  },
  {
    id: 2,
    name: "Grocery Bags",
    image: "/assets/generated/bag-grocery.dim_400x400.jpg",
    description: "Eco-friendly grocery totes",
    price: "₹95/pc",
  },
  {
    id: 3,
    name: "Wine Bags",
    image: "/assets/generated/bag-wine.dim_400x400.jpg",
    description: "Elegant bottle carriers",
    price: "₹180/pc",
  },
  {
    id: 4,
    name: "Promotional Bags",
    image: "/assets/generated/bag-promotional.dim_400x400.jpg",
    description: "Brand your business",
    price: "₹150/pc",
  },
  {
    id: 5,
    name: "Gift Bags",
    image: "/assets/generated/bag-gift.dim_400x400.jpg",
    description: "Beautiful gifting solutions",
    price: "₹250/pc",
  },
  {
    id: 6,
    name: "Custom Printed",
    image: "/assets/generated/bag-custom.dim_400x400.jpg",
    description: "Your design, our craft",
    price: "Request Quote",
  },
];

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Classic Shopping Bag",
    image: "/assets/generated/bag-shopping.dim_400x400.jpg",
    price: "₹120",
    bulkPrice: "₹95 (500+ pcs)",
    description:
      "Our bestselling natural jute shopping bag with rope handles. Perfect for retail, gifting, and daily use.",
    category: "Shopping",
  },
  {
    id: 2,
    name: "Eco Grocery Tote",
    image: "/assets/generated/bag-grocery.dim_400x400.jpg",
    price: "₹95",
    bulkPrice: "₹75 (500+ pcs)",
    description:
      "Wide-base grocery bag made from 100% natural jute. Sturdy enough for heavy loads, stylish enough to flaunt.",
    category: "Grocery",
  },
  {
    id: 3,
    name: "Premium Wine Carrier",
    image: "/assets/generated/bag-wine.dim_400x400.jpg",
    price: "₹180",
    bulkPrice: "₹145 (200+ pcs)",
    description:
      "Sophisticated single or double bottle wine bag with ribbon accent. Ideal for gifts and events.",
    category: "Wine",
  },
  {
    id: 4,
    name: "Corporate Promo Bag",
    image: "/assets/generated/bag-promotional.dim_400x400.jpg",
    price: "₹150",
    bulkPrice: "₹120 (300+ pcs)",
    description:
      "Large print area for branding. Available in various colors. Perfect for corporate events and trade shows.",
    category: "Promotional",
  },
];

const FEATURES = [
  {
    icon: Award,
    title: "Handcrafted Quality",
    text: "Every bag is carefully crafted by skilled artisans ensuring premium finish.",
  },
  {
    icon: Recycle,
    title: "100% Biodegradable",
    text: "Pure natural jute fiber — completely eco-friendly and compostable.",
  },
  {
    icon: Factory,
    title: "Bulk Manufacturing",
    text: "Capacity to fulfill large orders with consistent quality and timely delivery.",
  },
  {
    icon: Globe,
    title: "Global Export",
    text: "Trusted by clients across 20+ countries. Reliable international shipping.",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const contactRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const { data: backendProducts } = useGetAllProducts();
  const submitInquiry = useSubmitInquiry();

  const featuredProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts.slice(0, 4).map((p) => ({
          id: Number(p.pricePerPiece),
          name: p.name,
          image: p.imageUrl || "/assets/generated/bag-shopping.dim_400x400.jpg",
          price: `₹${p.pricePerPiece}`,
          bulkPrice: `₹${p.bulkPrice} (bulk)`,
          description: p.description,
          category: p.category,
        }))
      : SAMPLE_PRODUCTS;

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const validate = () => {
    const errors = { name: "", email: "", message: "" };
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email))
      errors.email = "Invalid email";
    if (!formData.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitInquiry.mutateAsync(formData);
      toast.success("Inquiry sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send inquiry. Please try WhatsApp instead.");
    }
  };

  useEffect(() => {
    document.title = "Tiruppur Jute Co. | Premium Jute Bags Manufacturer";
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* Top Announcement Bar */}
      <div className="bg-olive-dark text-white text-center py-2 text-xs sm:text-sm px-4">
        🌿 Tiruppur's Finest Jute Bag Manufacturer — Exporting to 20+ Countries
        | Bulk Orders Welcome
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-olive-dark flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-foreground text-base tracking-wide uppercase">
                Tiruppur Jute Co.
              </span>
              <p className="text-[10px] text-muted-foreground leading-none">
                Tiruppur, Tamil Nadu
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              {
                label: "Home",
                action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
              },
              { label: "Products", action: () => scrollTo(productsRef) },
              { label: "About", action: () => scrollTo(productsRef) },
              { label: "Contact", action: () => scrollTo(contactRef) },
            ].map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={item.action}
                data-ocid={`nav.${item.label.toLowerCase()}.link`}
                className="text-sm font-medium text-foreground hover:text-brown transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo(contactRef)}
              data-ocid="nav.quote.button"
              className="rounded-full bg-olive-dark hover:bg-olive-dark/90 text-white text-sm px-5"
            >
              Request Quote
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.menu.toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-border"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {["Home", "Products", "About", "Contact"].map((label) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => {
                      if (label === "Contact") scrollTo(contactRef);
                      else if (label === "Products") scrollTo(productsRef);
                      else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="text-left text-sm font-medium text-foreground hover:text-brown"
                  >
                    {label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollTo(contactRef)}
                  className="rounded-full bg-olive-dark text-white text-sm w-full"
                >
                  Request Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{ minHeight: 520 }}
        >
          <img
            src="/assets/generated/hero-jute-bags.dim_1200x600.jpg"
            alt="Premium jute bags"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div
            className="relative max-w-[1200px] mx-auto px-6 py-24 flex flex-col justify-center"
            style={{ minHeight: 520 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                <Star className="w-3 h-3 fill-white" /> Trusted by 500+ Brands
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                India's Premier Source for
                <br />
                <span className="text-amber-300">Premium Jute Bags</span>
              </h1>
              <p className="text-white/85 text-base sm:text-lg mb-8">
                Sustainable, durable, and stylish jute products crafted with
                passion in Tiruppur.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => scrollTo(productsRef)}
                  data-ocid="hero.catalog.button"
                  className="rounded-full bg-white text-foreground hover:bg-white/90 font-semibold px-6"
                >
                  View Catalog
                </Button>
                <Button
                  onClick={() => scrollTo(contactRef)}
                  data-ocid="hero.enquire.button"
                  className="rounded-full bg-brown hover:bg-brown/90 text-white font-semibold px-6"
                >
                  Enquire Now <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="bg-background py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Our Product Range
              </h2>
              <p className="text-muted-foreground">
                Explore our wide variety of handcrafted jute bags
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {SAMPLE_CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  data-ocid={`categories.item.${i + 1}`}
                >
                  <Card className="overflow-hidden border-border hover:shadow-card transition-shadow cursor-pointer group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-3 text-center">
                      <h3 className="font-semibold text-xs sm:text-sm text-foreground">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 mb-1 line-clamp-1">
                        {cat.description}
                      </p>
                      <span className="text-xs font-bold text-brown">
                        {cat.price}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-beige py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Why Choose Us?
              </h2>
              <p className="text-muted-foreground">
                What sets Tiruppur Jute Co. apart from the rest
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-olive-dark flex items-center justify-center mx-auto mb-4">
                    <feat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feat.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section ref={productsRef} className="bg-background py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our most popular jute bag collections
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  data-ocid={`products.item.${i + 1}`}
                >
                  <Card className="overflow-hidden border-border hover:shadow-card transition-shadow h-full flex flex-col">
                    <div className="aspect-square overflow-hidden bg-beige">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <span className="text-xs font-medium text-brown uppercase tracking-wide mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-foreground text-base mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-foreground">
                            {product.price}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            /pc
                          </span>
                        </div>
                        <span className="text-xs text-olive-dark font-medium">
                          {product.bulkPrice}
                        </span>
                      </div>
                      <Button
                        onClick={() => scrollTo(contactRef)}
                        data-ocid={`products.enquire.button.${i + 1}`}
                        className="w-full rounded-full bg-brown hover:bg-brown/90 text-white text-sm"
                      >
                        Enquire Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Bulk Inquiries */}
        <section ref={contactRef} className="bg-beige py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Get in Touch / Bulk Inquiries
              </h2>
              <p className="text-muted-foreground">
                Send us your requirements and we'll respond within 24 hours
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <Card className="border-border shadow-card">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="font-bold text-foreground text-xl mb-6">
                    Send an Inquiry
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact.name.input"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. Ramesh Kumar"
                        className="mt-1 bg-white border-border"
                      />
                      {formErrors.name && (
                        <p
                          className="text-destructive text-xs mt-1"
                          data-ocid="contact.name.error_state"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        data-ocid="contact.email.input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        className="mt-1 bg-white border-border"
                      />
                      {formErrors.email && (
                        <p
                          className="text-destructive text-xs mt-1"
                          data-ocid="contact.email.error_state"
                        >
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message / Requirements
                      </Label>
                      <Textarea
                        id="message"
                        data-ocid="contact.message.textarea"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            message: e.target.value,
                          }))
                        }
                        placeholder="Tell us about your bag requirements, quantity, customization needs..."
                        rows={5}
                        className="mt-1 bg-white border-border resize-none"
                      />
                      {formErrors.message && (
                        <p
                          className="text-destructive text-xs mt-1"
                          data-ocid="contact.message.error_state"
                        >
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      data-ocid="contact.submit.button"
                      disabled={submitInquiry.isPending}
                      className="w-full rounded-full bg-olive-dark hover:bg-olive-dark/90 text-white font-semibold text-base py-5"
                    >
                      {submitInquiry.isPending ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <div className="flex flex-col gap-6 justify-center">
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-6">
                    Contact Details
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-olive-dark flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Address</p>
                        <p className="text-muted-foreground text-sm">
                          Tiruppur, Tamil Nadu - 641603
                        </p>
                        <p className="text-muted-foreground text-sm">India</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                        <SiWhatsapp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          WhatsApp
                        </p>
                        <a
                          href="https://wa.me/911234567890"
                          target="_blank"
                          rel="noopener noreferrer"
                          data-ocid="contact.whatsapp.button"
                          className="text-[#25D366] font-bold text-lg hover:underline"
                        >
                          +91 12345 67890
                        </a>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          Chat with us on WhatsApp
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-olive-dark flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <a
                          href="tel:+911234567890"
                          className="text-foreground font-medium hover:text-brown transition-colors"
                        >
                          +91 1234567890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-olive-dark flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground text-sm">
                          info@tiruppur-juteco.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp.open_modal_button"
                  className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold rounded-full py-3 px-6 transition-colors shadow-md"
                >
                  <SiWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp for Quick Response
                </a>

                <div className="bg-white rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-brown" />
                    <span className="font-semibold text-sm text-foreground">
                      Business Hours
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monday – Saturday: 9:00 AM – 6:00 PM IST
                  </p>
                  <p className="text-sm text-muted-foreground">
                    WhatsApp: Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-olive-dark text-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-base tracking-wide uppercase">
                  Tiruppur Jute Co.
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Premium jute bag manufacturer based in Tiruppur, Tamil Nadu.
                Crafting sustainable, eco-friendly bags for brands worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Products", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => {
                        if (link === "Contact") scrollTo(contactRef);
                        else if (link === "Products") scrollTo(productsRef);
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      data-ocid={`footer.${link.toLowerCase().replace(" ", "-")}.link`}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                  <p className="text-white/70 text-sm">
                    Tiruppur, Tamil Nadu - 641603, India
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
                  <a
                    href="https://wa.me/911234567890"
                    className="text-white/70 hover:text-white text-sm"
                  >
                    +91 1234567890
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-white/60" />
                  <a
                    href="tel:+911234567890"
                    className="text-white/70 hover:text-white text-sm"
                  >
                    +91 1234567890
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white/60" />
                  <p className="text-white/70 text-sm">
                    info@tiruppur-juteco.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Tiruppur Jute Co. All rights
              reserved.
            </p>
            <p className="text-white/50 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
