"use client";
import React, { useEffect } from "react";

const DetailPage = () => {
  // decode HTML entities (if user pastes escaped HTML)
  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function extractMediaData(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const images = [];

    // 1. Extract <img> tags normally
    doc.querySelectorAll("img").forEach((img, index) => {
      images.push({
        id: images.length + 1,
        type: "img",
        src: img.getAttribute("src"),
        class: img.className || null,
        alt: img.alt || null,
      });
    });

    // 2. Extract background images from div.image-grid-image
    doc.querySelectorAll(".image-grid-image").forEach((div) => {
      const bg = div.style.backgroundImage;

      if (bg) {
        // Extract URL from:  url("https://example.com/image.jpg")
        const match = bg.match(/url\(["']?(.*?)["']?\)/);

        if (match && match[1]) {
          images.push({
            id: images.length + 1,
            type: "background",
            src: match[1],
            class: div.className || null,
          });
        }
      }
    });

    // 3. Extract video
    const videoEl = doc.querySelector("video");
    let video = null;

    if (videoEl) {
      video = {
        id: videoEl.id || null,
        poster: videoEl.getAttribute("poster") || null,
        src: videoEl.getAttribute("src") || null,
        muted: videoEl.muted,
        dataset: { ...videoEl.dataset },
      };
    }

    return {
      total_images: images.length,
      images,
      video,
    };
  }

  function extractProductData(htmlString) {
    const cleanHtml = decodeHtml(htmlString || "");
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHtml, "text/html");

    console.log(extractMediaData(htmlString), "as9dufs98ufusdf8usd98");

    const imgdata = extractMediaData(htmlString);

    const getText = (selector) => {
      const el = doc.querySelector(selector);
      return el ? el.textContent.trim() : null;
    };

    // -----------------------------
    // IMAGES (BG + <img>)
    // -----------------------------
    const images = [];

    doc.querySelectorAll("img").forEach((img, index) => {
      images.push({
        id: images.length + 1,
        type: "img",
        src: img.getAttribute("src"),
        class: img.className || null,
        alt: img.alt || null,
      });
    });

    // 2. Extract background images from div.image-grid-image
    doc.querySelectorAll(".image-grid-image").forEach((div) => {
      const bg = div.style.backgroundImage;

      if (bg) {
        // Extract URL from:  url("https://example.com/image.jpg")
        const match = bg.match(/url\(["']?(.*?)["']?\)/);

        if (match && match[1]) {
          images.push({
            id: images.length + 1,
            type: "background",
            src: match[1],
            class: div.className || null,
          });
        }
      }
    });

    // 3. Extract video
    const videoEl = doc.querySelector("video");
    let video = null;

    if (videoEl) {
      video = {
        id: videoEl.id || null,
        poster: videoEl.getAttribute("poster") || null,
        src: videoEl.getAttribute("src") || null,
        muted: videoEl.muted,
        dataset: { ...videoEl.dataset },
      };
    }
    console.log(
      {
        total_images: images.length,
        images,
        video,
      },
      "sdjohsdiuohcuiosdhiuo"
    );

    // -----------------------------
    // BRAND + NAME
    // -----------------------------
    const brand = getText("h1.pdp-title") || getText(".pdp-title") || null;
    const name =
      getText("h1.pdp-name") ||
      getText("h1.pdp-name") ||
      getText(".pdp-name") ||
      null;

    // -----------------------------
    // RATING + COUNT
    // -----------------------------
    // In your snippet rating sits inside .index-overallRating > div (first div) and .index-ratingsCount for count
    const ratingText = (() => {
      const overall = doc.querySelector(".index-overallRating");
      if (overall) {
        const valDiv = overall.querySelector("div");
        if (valDiv) return valDiv.textContent.trim();
      }
      // fallback
      return (
        getText(".index-flexRow .index-averageRating span") ||
        getText(".index-averageRating span") ||
        getText(".index-flexRow span")
      );
    })();
    const rating = ratingText ? parseFloat(ratingText) : null;

    const ratingCountText =
      getText(".index-ratingsCount") ||
      getText(".index-countDesc") ||
      getText(".pdp-ratings-count");
    const rating_count = ratingCountText
      ? parseInt(ratingCountText.replace(/\D/g, ""))
      : null;

    // -----------------------------
    // PRICE (selling_price, mrp, discount_percent)
    // selectors adapted to your snippet:
    //  - selling price: <span class="pdp-price"><strong>₹2446</strong></span>
    //  - mrp: .pdp-mrp contains <s>₹3495</s>
    //  - discount: either .pdp-discount or .pdp-mrp-verbiage-amt (30% OFF)
    // -----------------------------
    const sellingPriceTxt = (() => {
      const el =
        doc.querySelector(".pdp-price strong") ||
        doc.querySelector(".pdp-price");
      return el ? el.textContent.trim() : null;
    })();

    const selling_price = sellingPriceTxt
      ? parseInt(sellingPriceTxt.replace(/[^\d]/g, ""))
      : null;

    const mrpTxt = (() => {
      // try the s tag inside .pdp-mrp
      const s = doc.querySelector(".pdp-mrp s");
      if (s) return s.textContent.trim();
      // fallback: numeric inside .pdp-mrp-verbiage-amt (first occurrence that looks like mrp)
      const alt = [...doc.querySelectorAll(".pdp-mrp-verbiage-amt")].map((n) =>
        n.textContent.trim()
      );
      if (alt && alt.length) {
        // alt may contain "Rs. 3495" or "30% OFF" - pick the one with digits and likely larger number (mrp)
        for (const t of alt) {
          if (/\d/.test(t) && !/%/.test(t)) return t;
        }
      }
      // final fallback: any number-like substring in .pdp-mrp container
      const mrpContainer = doc.querySelector(".pdp-mrp");
      return mrpContainer ? mrpContainer.textContent.trim() : null;
    })();

    const mrp = mrpTxt ? parseInt(mrpTxt.replace(/[^\d]/g, "")) : null;

    const discountTxt = (() => {
      // prefer .pdp-mrp-verbiage-amt that has "OFF" or .pdp-discount
      const verbiage = [...doc.querySelectorAll(".pdp-mrp-verbiage-amt")]
        .map((n) => n.textContent.trim())
        .find((t) => /off/i.test(t));
      if (verbiage) return verbiage;
      const d = doc.querySelector(".pdp-discount");
      if (d) return d.textContent.trim();
      return null;
    })();

    const discount_percent = discountTxt
      ? parseInt(discountTxt.replace(/[^\d]/g, "")) || null
      : null;

    // -----------------------------
    // SIZES (size text, inventory if available)
    // -----------------------------
    const sizes = [
      ...doc.querySelectorAll(".size-buttons-tipAndBtnContainer"),
    ].map((container) => {
      const sizeBtn = container.querySelector(".size-buttons-unified-size");
      const inventoryEl = container.querySelector(
        ".size-buttons-inventory-left, .size-buttons-inventory-left-hidden"
      );
      const chestEl = container.querySelector(".size-buttons-measurementName");
      return {
        size: sizeBtn ? sizeBtn.textContent.trim() : null,
        inventory_left: inventoryEl
          ? (() => {
              const txt = inventoryEl.textContent.trim();
              const n = parseInt(txt.replace(/\D/g, ""));
              return isNaN(n)
                ? txt.toLowerCase().includes("hide")
                  ? null
                  : txt
                : n;
            })()
          : null,
        measurement: chestEl ? chestEl.textContent.trim() : null,
      };
    });

    // -----------------------------
    // DELIVERY SECTION (Fixed)
    // -----------------------------
    let pincode = null;
    let deliveryName = null;

    // extract address
    const addressText = getText(".pincode-text") || "";

    if (addressText) {
      const m = addressText.match(/\b\d{5,6}\b/);
      if (m) pincode = m[0];

      const nm = addressText.match(/\(([^)]+)\)/);
      if (nm) deliveryName = nm[1];
    }

    // Estimated Delivery
    const estimated_delivery = getText(".delivery-info-title");

    // Pay on Delivery (fixed — no :contains)
    const pay_on_delivery = [
      ...doc.querySelectorAll(".pincode-serviceabilityItem h4"),
    ].some((h) => h.textContent.toLowerCase().includes("pay on delivery"));

    // Returns
    const returns = getText(".return-window") || null;

    const delivery = {
      pincode,
      name: deliveryName,
      estimated_delivery,
      pay_on_delivery,
      returns,
    };

    // Fix pay_on_delivery fallback by searching text nodes
    const podNode = [
      ...doc.querySelectorAll(
        ".pincode-serviceabilityItem, .pincode-serviceabilityTitle, .pincode-serviceability-list li"
      ),
    ].find((n) => /pay on delivery/i.test(n.textContent));
    if (podNode) delivery.pay_on_delivery = true;

    // -----------------------------
    // OFFERS
    // -----------------------------
    const offers = [
      ...doc.querySelectorAll(
        ".pdp-offers-offerLikeBestPrice, .pdp-offers-offer, .pdp-offers-extraOffer"
      ),
    ].map((node) => {
      const titleEl =
        node.querySelector(".pdp-offers-offerTitle, b") ||
        node.querySelector("b");
      const descEl = node.querySelector(
        ".pdp-offers-labelMarkup, .pdp-offers-offerDesc, .pdp-offers-offerDesc li"
      );
      const linkEl = node.querySelector(".pdp-offers-linkButton");
      return {
        title: titleEl
          ? titleEl.textContent.trim()
          : node.textContent.trim().split("\n")[0],
        description: descEl ? descEl.textContent.trim() : null,
        link: linkEl ? linkEl.getAttribute("href") : null,
      };
    });

    // -----------------------------
    // BADGES
    // -----------------------------
    const badges = [
      ...doc.querySelectorAll(
        ".meta-desc, .pdp-productDescriptors .meta-desc, .pdp-productDescriptors div"
      ),
    ]
      .map((n) => n.textContent.trim())
      .filter(Boolean);

    // -----------------------------
    // PRODUCT DETAILS text (description)
    // -----------------------------
    const productDetails =
      getText(".pdp-product-description-content") ||
      getText(".pdp-product-details") ||
      getText(".pdp-productDescriptorsContainer p") ||
      null;

    // -----------------------------
    // SPECIFICATIONS (index-rowKey / index-rowValue in your snippet)
    // -----------------------------
    const specifications = {};
    doc.querySelectorAll(".index-row").forEach((row) => {
      const keyEl = row.querySelector(".index-rowKey");
      const valEl = row.querySelector(".index-rowValue");
      if (keyEl && valEl) {
        const key = keyEl.textContent.trim();
        const val = valEl.textContent.trim();
        if (key) specifications[key] = val;
      }
    });

    // Also attempt any other key/value lists
    if (Object.keys(specifications).length === 0) {
      // fallback: rows inside .index-tableContainer
      doc
        .querySelectorAll(".index-tableContainer .index-row")
        .forEach((row) => {
          const k = row.querySelector(".index-rowKey")?.textContent?.trim();
          const v = row.querySelector(".index-rowValue")?.textContent?.trim();
          if (k) specifications[k] = v || null;
        });
    }

    // -----------------------------
    // MATERIAL & CARE
    // -----------------------------
    let material_care = null;
    const materialNode = [...doc.querySelectorAll("h3, h4, h2")].find((h) =>
      /material|care/i.test(h.textContent)
    );
    if (materialNode) {
      // The content usually sits in next sibling paragraph
      const next = materialNode.nextElementSibling;
      material_care = next ? next.textContent.trim() : null;
      // fallback: any node with class 'pdp-sizeFitDescContent' etc
      if (!material_care)
        material_care =
          getText(".pdp-sizeFitDescContent") ||
          getText(".pdp-sizeFitDesc .pdp-product-description-content");
    }
    // last fallback
    if (!material_care)
      material_care =
        getText(".pdp-sizeFitDescContent") ||
        getText(".pdp-sizeFitDescContent");

    // -----------------------------
    // RATINGS breakdown (5..1)
    // -----------------------------
    const ratings_breakdown = [];
    doc.querySelectorAll(".index-ratingBarContainer").forEach((bar) => {
      const lvl =
        bar.querySelector(".index-ratingLevel")?.textContent?.trim() ||
        bar.querySelector("progress")?.getAttribute("data-rating");
      const count =
        bar.querySelector(".index-count")?.textContent?.trim() ||
        bar.querySelector("progress")?.getAttribute("value");
      if (lvl)
        ratings_breakdown.push({
          level: lvl,
          count: count ? parseInt(count.replace(/\D/g, "")) : null,
        });
    });

    // final assembled object
    return {
      product: {
        brand,
        name,
        rating,
        rating_count,
        price: {
          selling_price,
          mrp,
          discount_percent,
        },
        sizes,
        delivery,
        badges,
        offers,
        images,
        imgdata,
        specifications,
        material_care,
        ratings_breakdown,
      },
    };
  }

  const [dataInput, setDataInput] = React.useState("");
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored.reverse());
  }, [dataInput]);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Detail Page Extractor</h1>

      <textarea
        className="border w-full p-3 h-72 text-sm"
        placeholder="Paste product HTML here..."
        onBlur={(e) => {
          const html = e.target.value;

          setDataInput(html);
          // optional: show quick preview in alert (small)
          // alert(JSON.stringify(result.product.price, null, 2));
        }}
      ></textarea>
      <button
      className="bg-[#000] text-[#fff] p-4 w-full"
        onClick={() => {
          const getprod = localStorage.getItem("products");

          const result = extractProductData(dataInput);
          const newProd = { ...result.product };
          const preData = getprod ? JSON.parse(getprod) : [];
          const allProds = [...preData, newProd];
          localStorage.setItem("products", JSON.stringify(allProds));
          //   console.log("RESULT:", result, "adjis", preData);
          setDataInput("");
        }}
      >
        Get data
      </button>

      <div className="mt-5 flex flex-col gap-3">
        {products.map((prod, index) => (
          <div key={index} className="flex ">
            {prod.brand && (
              <p>
                <strong>Brand:</strong> {prod.brand}
              </p>
            )}
            {prod.name && (
              <p>
                <strong>Name:</strong> {prod.name}
              </p>
            )}
            {prod.imgdata && (
              <>
                {" "}
                <p>
                  <strong>Total Images:</strong> {prod.imgdata.total_images}
                </p>
                {prod.imgdata.images.map((img, ind) => (
                  <div
                    key={img.id}
                    className="mb-2 flex items-center gap-2 flex-row"
                  >
                    {img.type == "background" ? (
                      <img
                        src={img.src}
                        alt={img.alt || `Image ${img.id}`}
                        className="max-w-[40px] border"
                      />
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Paste the full product HTML (inspect & copy) then click outside the
        textarea. Result is printed to console.
      </p>
    </div>
  );
};

export default DetailPage;
