// src/components/Store.js
import React, { useState, useRef, useEffect } from 'react';
import './Store.css';
import { useNavigate } from 'react-router-dom';
import yugiohLogo from "../assets/yugiohlogo.png";
import mtgLogo from "../assets/mtglogo.png";
import pokemonLogo from "../assets/pokemonlogo.png";
import onepieceLogo from "../assets/onepiecelogo.png";
import starwarsLogo from "../assets/starwarslogo.png";
import lorcanaLogo from "../assets/lorcanalogo.png";
import digimonLogo from "../assets/digimonlogo.png";
import accessoriesLogo from "../assets/tcg-accessories.png";
import animeCCGs from "../assets/anime-ccgs.png";
import goddessStoryLogo from "../assets/goddess-story.png";
import honkaiLogo from "../assets/honkai.png";
import genshinImpactLogo from "../assets/genshin-impact.png";

// TCG categories
const tcgCategories = [
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

const StoreCom = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionThumbnails, setCollectionThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const scrollerRef = useRef(null);
  const navigate = useNavigate();

  const [selectedTcg, setSelectedTcg] = useState(() => {
  const savedTag = localStorage.getItem('selectedTcgTag');
  return (
    tcgCategories.find((tcg) => tcg.tag === savedTag) ||
    tcgCategories[0]
     );
  });

  useEffect(() => {
    setSelectedCollection(null); 
    setCollectionProducts([]); 
    if (selectedTcg.tag === "anime" && !selectedAnime) {
      setSelectedAnime(null); 
      setCollectionThumbnails([]); 
      fetchRecentProductsByTag("anime");
    } else {
      setCollectionThumbnails([]); 
      fetchRecentProductsByTag(selectedTcg.tag);
      fetchCollectionThumbnails(selectedTcg);
    }
  }, [selectedTcg,selectedAnime]);

  useEffect(() => {
    if (selectedTcg.tag === "anime" && selectedAnime) {
      fetchCollectionThumbnails(selectedTcg, selectedAnime);
      fetchRecentProductsByTagAndTitle(selectedTcg.tag,selectedAnime.name);
      setSelectedCollection(null);
      setCollectionProducts([]);
    }
  }, [selectedAnime, selectedTcg]);

  useEffect(() => {
    if (selectedCollection) {
      if (selectedTcg.tag === "anime" && selectedAnime) {
        fetchCollectionProductsByTagAndName(
          selectedTcg.tag,
          selectedCollection.tag,
          selectedAnime.name
        );
      } else {
        fetchCollectionProducts(selectedTcg.tag, selectedCollection.tag);
      }
    }
  }, [selectedCollection, selectedAnime, selectedTcg]);
  
  // Fetch recent products for the selected TCG
  const fetchRecentProductsByTag = async (tag) => {
    setLoading(true);
    
    try {
      const query = `
        query RecentProductsByTag {
          products(query: "tag:${tag} AND inventory_total:>0 AND tag_not:test", first: 8, sortKey: CREATED_AT, reverse: true) {
            nodes {
              media(first: 1) {
                nodes {
                  previewImage {
                    url
                  }
                }
              }
              title
              totalInventory
              id
              descriptionHtml
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      
      if (data.data && data.data.products && data.data.products.nodes) {
        setRecentProducts(data.data.products.nodes);
      } else {
        setRecentProducts([]);
        console.error('No recent products found or unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching recent products:', error);
      setRecentProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentProductsByTagAndTitle = async (tag, titleContains) => {
      setLoading(true);
      const safeTitle = titleContains.replace(/"/g, '\\"');
      const queryString = `tag:${tag} AND title:*${safeTitle}* AND inventory_total:>0 AND tag_not:test`;

      try {
        const query = `
          query RecentProductsByTagAndTitle {
            products(query: "${queryString}", first: 8, sortKey: CREATED_AT, reverse: true) {
              nodes {
                media(first: 1) {
                  nodes {
                    previewImage {
                      url
                    }
                  }
                }
                title
                totalInventory
                id
                descriptionHtml
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.data && data.data.products && data.data.products.nodes) {
          setRecentProducts(data.data.products.nodes);
        } else {
          setRecentProducts([]);
          console.error('No recent products found or unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching recent products:', error);
        setRecentProducts([]);
      } finally {
        setLoading(false);
      }
    };

  const fetchCollectionThumbnails = async (tcg, selectedAnime = null) => {
    setLoading(true);
    let collections = [];

    if (tcg.tag === "anime" && selectedAnime) {
      collections = selectedAnime.collections;
    } 
    else if (tcg.tag === "anime" && !selectedAnime) {
      setCollectionThumbnails(
        tcg.animes.map(anime => ({
          ...anime,
          hasProducts: true,
          thumbnailUrl: anime.image, 
        }))
      );
      return;
    } else if (tcg.collections) {
      collections = tcg.collections;
    }

    const thumbnailsPromises = collections.map(async (collection) => {
      try {

        let queryString;
        if (tcg.tag === "anime" && selectedAnime) {
          queryString = `tag:anime AND tag:${collection.tag} AND title:*${selectedAnime.name}* AND inventory_total:>0 AND tag_not:test`;
        } else {
          queryString = `tag:${tcg.tag} AND tag:${collection.tag} AND inventory_total:>0 AND tag_not:test`;
        }

        const query = `
          query CollectionThumbnail {
            products(query: "${queryString}", first: 5) {
              nodes {
                title
                media(first: 1) { nodes { previewImage { url } } }
                id
              }
            }
          }
        `;

        const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        let nodes = data.data?.products?.nodes || [];

        if (nodes.length > 0) {
          return {
            ...collection,
            hasProducts: true,
            thumbnailUrl: nodes[0].media.nodes[0]?.previewImage?.url || null
          };
        } else {
          return {
            ...collection,
            hasProducts: false,
            thumbnailUrl: null
          };
        }
      } catch (error) {
        console.error(`Error fetching thumbnail for ${collection.name}:`, error);
        return {
          ...collection,
          hasProducts: false,
          thumbnailUrl: null
        };
      }finally{
          setLoading(false);
      }
    });

    const thumbnails = await Promise.all(thumbnailsPromises);
    setCollectionThumbnails(thumbnails.filter(thumbnail => thumbnail.hasProducts));
  };

  // Fetch products for a specific collection
  const fetchCollectionProducts = async (tcgTag, collectionTag) => {
    setCollectionLoading(true);
    
    try {
      const query = `
        query CollectionProducts {
          products(query: "tag:${tcgTag} AND tag:${collectionTag} AND inventory_total:>0 AND tag_not:test", first: 12) {
            nodes {
              media(first: 1) {
                nodes {
                  previewImage {
                    url
                  }
                }
              }
              title
              totalInventory
              id
              descriptionHtml
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      
      if (data.data && data.data.products && data.data.products.nodes) {
        setCollectionProducts(data.data.products.nodes);
      } else {
        setCollectionProducts([]);
        console.error('No collection products found or unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching collection products:', error);
      setCollectionProducts([]);
    } finally {
      setCollectionLoading(false);
    }
  };

  const fetchCollectionProductsByTagAndName = async (tcgTag, collectionTag, tcgName) => {
    setCollectionLoading(true);
    
    try {
      const query = `
        query CollectionProducts {
          products(query: "tag:${tcgTag} AND tag:${collectionTag} AND inventory_total:>0 AND tag_not:test", first: 50) {
            nodes {
              media(first: 1) {
                nodes {
                  previewImage {
                    url
                  }
                }
              }
              title
              totalInventory
              id
              descriptionHtml
              tags
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://064679-3.myshopify.com/api/2023-07/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '5b98e116f2c08ee62389cf9331650002',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      let products = data.data?.products?.nodes || [];
      if (tcgName) {
        const nameLower = tcgName.toLowerCase();
        products = products.filter(product =>
          product.title.toLowerCase().includes(nameLower)
        );
      }

      setCollectionProducts(products);
    } catch (error) {
      setCollectionProducts([]);
      console.error("Error fetching collection products:", error);
    } finally {
      setCollectionLoading(false);
    }
  };

  const handleTcgSelect = (tcg) => {
    setSelectedAnime(null);
    setSelectedTcg(tcg);
    localStorage.setItem('selectedTcgTag', tcg.tag); 
  };

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setCollectionProducts([]);
  };

  // Arrow navigation for the scroller
  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Format price for display
  const formatPrice = (price, currency = 'USD') => {
    if (!price) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(parseFloat(price));
  };

  // Render product cards
  const renderProductCards = (products) => {
    return products.map((product) => {

       const isPreSale = product.tags?.includes('pre-sale');
       const inStock = product.totalInventory > 0 || isPreSale;

      return (
        <div key={product.id} className="product-card">
          <img 
            src={product.media.nodes[0]?.previewImage?.url || '/images/placeholder.jpg'} 
            alt={product.title} 
            className="product-img" 
          />
          <h4>{product.title}</h4>
          <p className="inventory"> {inStock ? `In stock: ${product.totalInventory}` : 'Out of stock'}</p>          <p className="price">
            {product.priceRange?.minVariantPrice 
              ? formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
              : 'Price unavailable'}
          </p>
          <button 
            className="buy-button"
              onClick={() => {
                navigate(`/product?id=${encodeURIComponent(product.id)}`, { 
                  state: { 
                    productId: product.id
                  } 
                });
              }}
          >
            View Details
          </button>
        </div>
      );
    });
  };

  return (
    <div className="store-section">
      <h2 className="store-heading">Our Products</h2>
      
      <div className="tcg-scroller-container">
        {/* <button className="scroll-button left" onClick={scrollLeft}>&#10094;</button> */}
        <div className="tcg-scroller" ref={scrollerRef}>
          {tcgCategories.map((tcg) => (
            <div 
              key={tcg.id} 
              className={`tcg-tab ${selectedTcg.id === tcg.id ? 'active' : ''}`}
              onClick={() => handleTcgSelect(tcg)}
            >
              <img src={tcg.image} alt={tcg.name} className="tcg-thumbnail" />
              <span className='tcg-name'>{tcg.name}</span>
            </div>
          ))}
        </div>
        {/* <button className="scroll-button right" onClick={scrollRight}>&#10095;</button> */}
      </div>

      <div className="tcg-content">
        <div className="tcg-intro">
          <h3>{selectedTcg.name}</h3>
          <p>{selectedTcg.description}</p>
        </div>

        {/* Anime section: show animes as "collections" */}
        {selectedTcg.tag === "anime" && !selectedAnime && (
          <>
            <h3 className="section-heading">Anime Series</h3>
            <div className="collections-container">
              <div className="collection-thumbnails">
              {selectedTcg.animes.map(anime => (
                <div
                  key={anime.name}
                  className="collection-thumbnail"
                  onClick={() => setSelectedAnime(anime)}
                >
                  <div className="thumbnail-image-container">
                    <img src={anime.image} alt={anime.name} className="thumbnail-img" />
                  </div>
                  <h4 className="collection-name">{anime.name}</h4>
                </div>
              ))}
            </div>
            </div>
          </>
        )}

        {selectedTcg.tag === "anime" && selectedAnime && !selectedCollection && (
          <>
            <button className="collection-back-button" onClick={() => setSelectedAnime(null)}>
              &#8592; Back to Anime
            </button>
            <h3 className="section-heading">{selectedAnime.name} Collections</h3>
            <div className="collections-container">
             <div className="collection-thumbnails">
              {collectionThumbnails.map(collection => (
                <div
                  key={collection.tag}
                  className="collection-thumbnail"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <div className="thumbnail-image-container">
                    <img
                        src={collection.thumbnailUrl}
                        alt={collection.name}
                        className="thumbnail-img"
                      /> 
                  </div>
                  <h4 className="collection-name">{collection.name}</h4>
                </div>
              ))}
            </div>
          </div>
          </>
        )}

        {/* Collection Thumbnails */}
        {selectedTcg.tag !== "anime" && !selectedCollection && (
          <>
            <h3 className="section-heading">Collections</h3>
            <div className="collections-container"> 
              {collectionThumbnails.length > 0 ? (
                <div className="collection-thumbnails">
                  {collectionThumbnails.map((collection) => (
                    <div 
                      key={collection.tag} 
                      className="collection-thumbnail"
                      onClick={() => handleCollectionSelect(collection)}
                    >
                      <div className="thumbnail-image-container">
                        <img 
                          src={collection.thumbnailUrl || '/images/placeholder.jpg'} 
                          alt={collection.name} 
                          className="thumbnail-img" 
                        />
                      </div>
                      <h4 className="collection-name">{collection.name}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-collections">No collections available for {selectedTcg.name}.</p>
              )}
            </div>
          </>
        )}

        {/* Collection Products */}
        {selectedCollection && (
          <div className="collection-products-section">
            <button className="collection-back-button" onClick={handleBackToCollections}>
                &#8592; Back to Collections
              </button>
            <div className="collection-header">          
              <h3 className="collection-title">{selectedCollection.name}</h3>
            </div>
            
            {collectionLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading collection products...</p>
              </div>
            ) : collectionProducts.length > 0 ? (
              <div className="product-gallery">
                {renderProductCards(collectionProducts)}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found in this collection.</p>
              </div>
            )}
          </div>
        )}

        {/* Recently Stocked Products */}
        {!selectedCollection && (
          <>
            <h3 className="section-heading">Recently Stocked</h3>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : recentProducts.length > 0 ? (
              <div className="product-gallery">
                {renderProductCards(recentProducts)}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found for {selectedTcg.name}.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StoreCom;