import React, { useState } from "react";
import "./FAQ.css"; // Import styles
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Dropdown icons

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track open question

  const faqs = [
    {
      question: "What is Yuranka Games?",
      answer:
        "Yuranka Games is a gaming store specializing in Trading Card Games, Board Games, and Video Games. We are an official TCG store for Yu-Gi-Oh!, Magic: The Gathering (MTG), One Piece Card Game, Digimon Card Game, Dragon Ball Super Card Game, Star Wars Unlimited, and Flesh and Blood. We also offer Pokémon products and tournaments, though we are not an official Pokémon TCG store.\n\nWe operate through our online shop, Cardmarket, and in person at our physical store. In addition to retail, we provide table bookings for gaming sessions, video game rentals, and birthday party organization at affordable rates."
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order through our website by adding items to your cart and proceeding to checkout. We accept various payment methods, and you’ll receive an order confirmation via email once your purchase is completed."
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We offer worldwide shipping, and for orders above 400€, we provide free shipping via DHL or UPS Express."
    },
    {
      question: "Do international orders include customs duties or taxes?",
      answer:
        "No, international orders do not include customs duties or import taxes. These charges vary by country and are the buyer’s responsibility. Additionally, due to customs regulations, we must declare the full value of the products being shipped."
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times depend on the destination:\n• Orders above 400€: Shipped via DHL or UPS Express (Worldwide delivery in 2-5 working days).\n• Orders below 400€: Shipping time varies based on the chosen shipping method and destination.\n\nYou will receive a tracking number once your order is shipped."
    },
    {
      question: "What are the shipping costs?",
      answer:
        "• Orders below 40€: 15€ shipping fee\n• Orders between 40€ and 199€: Shipping cost varies based on the destination\n• Orders between 200€ and 399€: 75€ shipping fee\n• Orders above 400€: Free worldwide shipping via DHL or UPS Express"
    },
    {
      question: "Can I sell my cards to Yuranka Games?",
      answer:
        "Yes! We currently buy all cards on the spot for in-store customers, offering 50% of market price in store credit. We do not currently buy collections for money, but we plan to introduce this option soon."
    },
    {
      question: "Do you have a physical store?",
      answer:
        "Yes! Our store is located at:\nMatīsa 25, 2nd floor of Bērnu Pasaule, Riga, Latvia, Europe.\n\nYou can visit us to browse our products, participate in tournaments, sell your cards for store credit, or book tables for gaming sessions."
    },
    {
      question: "Do you offer table bookings or gaming sessions?",
      answer:
        "Yes! We offer:\n• Table bookings for 5€/table/hour or 2€/table/person/hour.\n• Video game sessions for 3€/hour (up to 3 people) and 5€/hour (more than 3 people)."
    },
    {
      question: "Do you organize birthday parties?",
      answer:
        "Yes! We offer special birthday party organization at a very affordable price. Our events include gaming activities tailored to your preferences, making it a fun and memorable experience for all participants. Contact us for more details!"
    },
    {
      question: "How can I contact Yuranka Games?",
      answer:
        "You can reach us via email at support@yuranka.com or message us through any of our social medias: https://linktr.ee/yurankatcg. We aim to respond as quickly as possible to assist you with any questions or concerns."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-heading">FAQs</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              {openIndex === index ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
            </button>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
