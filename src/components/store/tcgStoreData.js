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
import yugiohstructure from "../../assets/store/yugioh-structure.png";
import yugiohBoosterpack from "../../assets/store/yugioh-boosterpack.png";
import yugiohTin from "../../assets/store/yugioh-tin.png";
import yugiohBoosterbox from "../../assets/store/yugioh-boosterbox.png";
import yugiohAccessories from "../../assets/store/yugioh-accessories.png";
import yugiohPresale from "../../assets/store/yugioh-presale.png";
import mtgCommander from "../../assets/store/mtg-commander.png";
import mtgBoosterPack from "../../assets/store/mtg-booster-pack.png";
import mtgDeckBoxes from "../../assets/store/mtg-deck.webp";
import mtgChallengerDeck from "../../assets/store/mtg-challenger.png";
import mtgPresale from "../../assets/store/mtg-presale.jpg";
import pokemonBoosterBox from "../../assets/store/pkm-boosterbox.webp";
import pokemonEliteTrainer from "../../assets/store/pkm-elite.webp";
import pokemonCollectorChest from "../../assets/store/pkm-collectors.webp";
import pokemonBattleDeck from "../../assets/store/pkm-battle.webp";
import pokemonPremiumCollection from "../../assets/store/pkm-premium.webp";
import pokemonTwoPlayerStarter from "../../assets/store/pkm-two.webp";
import pokemonBoosterPack from "../../assets/store/pkm-boosterpack.webp";
import pokemonTin from "../../assets/store/pkm-tin.png";
import pokemonSleeves from "../../assets/store/pkm-sleeves.webp";
import pokemonDeckBox from "../../assets/store/pkm-deck.webp";
import pokemonPlaymats from "../../assets/store/pkm-playmat.webp";
import pokemonOthers from "../../assets/store/pkm-others.webp";
import digimonStarterDeck from "../../assets/store/digimon-starter.webp";
import digimonBoosterPack from "../../assets/store/digimon-boosterpack.webp";
import digimonBoosterBox from "../../assets/store/digimon-boosterbox.webp";
import digimonDoublePack from "../../assets/store/digimon-double.webp";
import digimonPremiumCollection from "../../assets/store/digimon-premium.webp";
import digimonSleeves from "../../assets/store/digimon-sleeves.webp";
import onePieceStarterDeck from "../../assets/store/onepiece-starter.webp";
import onePieceBoosterPack from "../../assets/store/onepiece-boosterpack.webp";
import onePieceBoosterBox from "../../assets/store/onepiece-boosterbox.webp";
import onePieceDeckBoxes from "../../assets/store/onepiece-deckbox.webp";
import onePieceCollectibles from "../../assets/store/onepiece-collectibles.webp";
import onePieceSleeves from "../../assets/store/onepiece-sleeves.webp";
import onePiecePreSale from "../../assets/store/onepiece-presale.webp";
import starWarsStarterDeck from "../../assets/store/starwars-starter.webp";
import starWarsBoosterPack from "../../assets/store/starwars-boosterpack.webp";
import starWarsBoosterBox from "../../assets/store/starwars-boosterbox.webp";
import starWarsDeckBoxes from "../../assets/store/starwars-deck.webp";
import starWarsPlaymats from "../../assets/store/starwars-playmat.webp";
import lorcanaStarterDeck from "../../assets/store/lorcana-starter.webp";
import lorcanaBoosterPack from "../../assets/store/lorcana-boosterpack.webp";
import lorcanaBoosterBox from "../../assets/store/lorcana-boosterbox.webp";
import goddessBoosterBox from "../../assets/store/goddess-boosterbox.webp";
import goddessBoosterPack from "../../assets/store/goddess-boosterpack.webp";
import honkaiBoosterBox from "../../assets/store/honkai-boosterbox.webp";
import honkaiBoosterPack from "../../assets/store/honkai-boosterpack.webp";
import genshinBoosterBox from "../../assets/store/genshin-boosterbox.webp";
import genshinBoosterPack from "../../assets/store/genshin-boosterpacks.webp";
import tcgDeck from "../../assets/store/tcg-deck.webp";
import tcgSleeves from "../../assets/store/tcg-sleeve.webp";
import tcgBinders from "../../assets/store/tcg-binder.webp";
import tcgPlaymats from "../../assets/store/tcg-playmat.webp";
import tcgPocketPages from "../../assets/store/tcg-pocketpages.webp";

export const tcgCategories = [
  {
    id: 1,
    name: "Yu-Gi-Oh!",
    image: yugiohLogo,
    tag: "yugioh",
    description: "The original Japanese trading card game that's been popular worldwide since 1999.",
    collections: [
      { name: "Structure Decks", tag: "structure-deck", image: yugiohstructure },
      { name: "Booster Packs", tag: "booster-pack", image: yugiohBoosterpack },
      { name: "Tins & Special Editions", tag: "mega-tin", image: yugiohTin },
      { name: "Booster Box", tag: "Booster-box", image: yugiohBoosterbox },
      { name: "Accessories", tag: "accessories", image: yugiohAccessories },
      { name: "Pre-Sale", tag: "pre-sale", image: yugiohPresale }
    ]
  },
  {
    id: 2,
    name: "Magic: The Gathering",
    image: mtgLogo,
    tag: "magic",
    description: "The world's first trading card game with over 20 million players worldwide.",
    collections: [
      { name: "Commander Decks", tag: "commander", image: mtgCommander },
      { name: "Booster Packs", tag: "booster-pack", image: mtgBoosterPack },
      { name: "Deck Boxes", tag: "deck_boxes", image: mtgDeckBoxes },
      { name: "Challenger Deck", tag: "Challenger deck", image: mtgChallengerDeck },
      { name: "Pre-Sale", tag: "pre-sale", image: mtgPresale }
    ]
  },
  {
    id: 3,
    name: "Pokémon TCG",
    image: pokemonLogo,
    tag: "pokemon",
    description: "Catch, collect and battle with your favorite Pokémon characters.",
    collections: [
      { name: "Booster Boxes", tag: "booster-box", image: pokemonBoosterBox },
      { name: "Elite Trainer Boxes", tag: "elite-trainer", image: pokemonEliteTrainer },
      { name: "Booster Packs", tag: "booster-pack", image: pokemonBoosterPack },
      { name: "Collector's Chest", tag: "Collecter-Chest", image: pokemonCollectorChest },
      { name: "Battle Deck", tag: "battle-deck", image: pokemonBattleDeck },
      { name: "Premium Collection", tag: "Premum-deck-box" , image: pokemonPremiumCollection },
      { name: "Pokemon Tin", tag: "mega-tin", image: pokemonTin },
      { name: "Two Play Starter Deck", tag: "two-player-starter-decks", image: pokemonTwoPlayerStarter },
      { name: "Sleeves", tag: "sleeves" , image: pokemonSleeves },
      { name: "Deck Box", tag: "deck_boxes" , image: pokemonDeckBox },
      { name: "Playmats", tag: "Playmats" , image: pokemonPlaymats },
      { name: "Others", tag: "others" , image: pokemonOthers },
    ]
  },
  {
    id: 4,
    name: "Digimon Card Game",
    image: digimonLogo,
    tag: "digimon",
    description: "The next evolution in digital monster card games.",
    collections: [
      { name: "Starter Decks", tag: "starter_deck", image: digimonStarterDeck },
      { name: "Booster Packs", tag: "booster-pack", image: digimonBoosterPack },
      { name: "Booster Box", tag: "booster-box", image: digimonBoosterBox },
      { name: "Double Pack", tag: "Doube-Booster-pack", image: digimonDoublePack },
      { name: "Premium Collection Deck", tag: "Premum-deck-box", image: digimonPremiumCollection },
      { name: "Sleeves", tag: "sleeves", image: digimonSleeves },
    ]
  },
  {
    id: 5,
    name: "One Piece",
    image: onepieceLogo,
    tag: "one-piece",
    description: "Finding the One-Piece.",
    collections: [
      { name: "Starter Decks", tag: "starter_deck", image: onePieceStarterDeck },
      { name: "Booster Packs", tag: "booster-pack", image: onePieceBoosterPack },
      { name: "Booster Box", tag: "Booster-box", image: onePieceBoosterBox },
      { name: "Deck Boxes", tag: "deck_boxes", image: onePieceDeckBoxes },
      { name: "Collectibles", tag: "figurines", image: onePieceCollectibles },
      { name: "Sleeves", tag: "sleeves", image: onePieceSleeves },
      { name: "Pre-Sale", tag: "pre-sale", image: onePiecePreSale },
    ]
  },
  {
    id: 6,
    name: "Star Wars Card Game",
    image: starwarsLogo,
    tag: "Star-wars",
    description: "Welcome to the Dark Side",
    collections: [
      { name: "Starter Decks", tag: "two-player-starter-decks", image: starWarsStarterDeck },
      { name: "Booster Packs", tag: "booster-pack", image: starWarsBoosterPack },
      { name: "Booster Box", tag: "Booster-box", image: starWarsBoosterBox },
      { name: "Deck Box", tag: "deck_boxes", image: starWarsDeckBoxes },
      { name: "Playmats", tag: "Playmats", image: starWarsPlaymats },
    ]
  },
  {
    id: 7,
    name: "Lorcana Card Game",
    image: lorcanaLogo,
    tag: "lorcana",
    description: "Lorcana TCG",
    collections: [
      { name: "Starter Decks", tag: "starter_deck", image: lorcanaStarterDeck },
      { name: "Booster Packs", tag: "booster-pack", image: lorcanaBoosterPack },
      { name: "Booster Box", tag: "Booster-box", image: lorcanaBoosterBox },
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
          { name: "Booster Box", tag: "Booster box", image: goddessBoosterBox },
          { name: "Booster Packs", tag: "booster pack", image: goddessBoosterPack }
        ]
      },
      {
        id: 2,
        name: "Honkai",
        image: honkaiLogo,
        collections: [
          { name: "Booster Box", tag: "Booster box", image: honkaiBoosterBox },
          { name: "Booster Packs", tag: "booster pack", image: honkaiBoosterPack }
        ]
      },
      {
        id: 3,
        name: "Genshin Impact",
        image: genshinImpactLogo,
        collections: [
          { name: "Banners", tag: "banners", image: genshinBoosterBox },
          { name: "Booster Box", tag: "booster-box", image: genshinBoosterBox },
          { name: "Booster Packs", tag: "booster pack", image: genshinBoosterPack }
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
      { name: "Deck Boxes", tag: "deck_boxes", image: tcgDeck },
      { name: "Sleeves", tag: "sleeves", image: tcgSleeves },
      { name: "Binders", tag: "Binders", image: tcgBinders },
      { name: "Playmats", tag: "Playmats", image: tcgPlaymats },
      { name: "Pocket Pages", tag: "Pocket_pages", image: tcgPocketPages }
    ]
  },
];