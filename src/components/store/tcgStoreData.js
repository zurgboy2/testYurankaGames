import yugiohLogo from "../../assets/store/yugiohlogo.png";
import mtgLogo from "../../assets/store/mtglogo.png";
import pokemonLogo from "../../assets/store/pokemonlogo.png";
import onepieceLogo from "../../assets/store/onepiecelogo.png";
import starwarsLogo from "../../assets/store/starwarslogo.png";
import lorcanaLogo from "../../assets/store/lorcanalogo.png";
import digimonLogo from "../../assets/store/digimonlogo.png";
import accessoriesLogo from "../../assets/store/tcg-accessories.png";
import animeCCGs from "../../assets/store/anime-ccgs.png";
import goddessStoryLogo from "../../assets/store/goddess-story.png";
import honkaiLogo from "../../assets/store/honkai.png";
import genshinImpactLogo from "../../assets/store/genshin-impact.png";

// TCG categories
export const tcgCategories = [
  {
    id: 1,
    name: "Yu-Gi-Oh!",
    image: yugiohLogo,
    tag: "yugioh",
    description: "The original Japanese trading card game that's been popular worldwide since 1999.",
    collections: [
      { name: "Structure Decks", tag: "structure-deck" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Tins & Special Editions", tag: "mega-tin" },
      { name: "Booster Box", tag: "Booster-box" },
      { name: "Accessories", tag: "accessories" },
      { name: "Pre-Sale", tag: "pre-sale" }
    ]
  },
  {
    id: 2,
    name: "Magic: The Gathering",
    image: mtgLogo,
    tag: "magic",
    description: "The world's first trading card game with over 20 million players worldwide.",
    collections: [
      { name: "Commander Decks", tag: "commander" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Deck Boxes", tag: "deck_boxes" },
      { name: "Challenger Deck", tag: "Challenger deck" },
      { name: "Pre-Sale", tag: "pre-sale" }

    ]
  },
  {
    id: 3,
    name: "Pokémon TCG",
    image: pokemonLogo,
    tag: "pokemon",
    description: "Catch, collect and battle with your favorite Pokémon characters.",
    collections: [
      { name: "Booster Boxes", tag: "booster-box" },
      { name: "Elite Trainer Boxes", tag: "elite-trainer" },
      { name: "Theme Decks", tag: "theme-deck" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Collector's Chest", tag: "Collecter-Chest" },
      { name: "Battle Deck", tag: "battle-deck" },
      { name: "Premium Collection", tag: "Premum-deck-box" },
      { name: "Pokemon Tin", tag: "mega-tin" },
      { name: "Two Play Starter Deck", tag: "two-player-starter-decks" },
      { name: "Accessories", tag: "accessories" },
      { name: "Pre-Sale", tag: "pre-sale" }
    ]
  },
  {
    id: 4,
    name: "Digimon Card Game",
    image: digimonLogo,
    tag: "digimon",
    description: "The next evolution in digital monster card games.",
    collections: [
      { name: "Starter Decks", tag: "starter_deck" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Booster Box", tag: "booster-box" },
      { name: "Double Pack", tag: "Doube-Booster-pack" },
      { name: "Premium Collection Deck", tag: "Premum-deck-box" },
      { name: "Sleeves", tag: "sleeves" },
      { name: "Pre-Sale", tag: "pre-sale" }
    ]
  },
  {
    id: 5,
    name: "One Piece",
    image: onepieceLogo,
    tag: "one-piece",
    description: "Finding the One-Piece.",
    collections: [
      { name: "Starter Decks", tag: "starter_deck" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Booster Box", tag: "Booster-box" },
      { name: "Deck Boxes", tag: "deck_boxes" },
      { name: "Collectibles", tag: "figurines" },
      { name: "Sleeves", tag: "sleeves" },
      { name: "Pre-Sale", tag: "pre-sale" },
    ]
  },
  {
    id: 6,
    name: "Star Wars Card Game",
    image: starwarsLogo,
    tag: "Star-wars",
    description: "Welcome to the Dark Side",
    collections: [
      { name: "Starter Decks", tag: "two-player-starter-decks" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Booster Box", tag: "Booster-box" },
      { name: "Deck Box", tag: "deck_boxes" },
      { name: "Playmats", tag: "Playmats" },
      { name: "Pre-Sale", tag: "pre-sale" }
    ]
  },
  {
    id: 7,
    name: "Lorcana Card Game",
    image: lorcanaLogo,
    tag: "lorcana",
    description: "Lorcana TCG",
    collections: [
      { name: "Starter Decks", tag: "starter_deck" },
      { name: "Booster Packs", tag: "booster-pack" },
      { name: "Booster Box", tag: "Booster-box" },
      { name: "Pre-Sale", tag: "pre-sale" }
    ]
  },
  {
    id: 8,
    name: "Anime CCGs",
    image: animeCCGs,
    tag: "anime",
    description: "Play the best anime card games!",
    animes: [
      {
        id: 1,
        name: "Goddess Story",
        image: goddessStoryLogo,
        collections: [
          { name: "Booster Box", tag: "Booster box" },
          { name: "Booster Packs", tag: "booster pack" }
        ]
      },
      {
        id: 2,
        name: "Honkai",
        image: honkaiLogo,
        collections: [
          { name: "Booster Box", tag: "Booster box" },
          { name: "Booster Packs", tag: "booster pack" }
        ]
      },
      {
        id: 3,
        name: "Genshin Impact",
        image: genshinImpactLogo,
        collections: [
          { name: "Banners", tag: "banners" },
          { name: "Booster Box", tag: "booster-box" },
          { name: "Booster Packs", tag: "booster pack" }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Accessories",
    image: accessoriesLogo,
    tag: "accessories",
    description: "Accessories TCG",
    collections: [
      { name: "Deck Boxes", tag: "deck_boxes" },
      { name: "Sleeves", tag: "sleeves" },
      { name: "Binders", tag: "Binders" },
      { name: "Playmats", tag: "Playmats" },
      { name: "Pocket Pages", tag: "Pocket_pages" }
    ]
  },
];