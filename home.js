document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });

    }


    /* =========================
       STICKY NAVBAR
    ========================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });

    }


    /* =========================
       GAME SEARCH + FILTER
    ========================= */

    const searchBox = document.getElementById("searchBox");

    const gameCards = Array.from(
        document.querySelectorAll(".game-card")
    );

    const filterButtons = document.querySelectorAll(
        ".filter-btn"
    );

    let currentFilter = "all";


    function updateGames() {

        if (gameCards.length === 0) {
            return;
        }

        const searchText = searchBox
            ? searchBox.value.trim().toLowerCase()
            : "";


        gameCards.forEach(card => {

            /* FILTER CHECK */

            const matchesFilter =
                currentFilter === "all" ||
                card.classList.contains(currentFilter);


            /* SEARCH DATA */

            const dataTitle =
                card.dataset.title || "";

            const dataDescription =
                card.dataset.desc || "";

            const visibleTitle =
                card.querySelector("h3")
                ?.textContent || "";

            const visibleDescription =
                card.querySelector("p")
                ?.textContent || "";

            const category =
                currentFilter === "all"
                    ? ""
                    : currentFilter;


            /* COMBINE SEARCH TEXT */

            const searchableText = (

                dataTitle + " " +
                dataDescription + " " +
                visibleTitle + " " +
                visibleDescription + " " +
                category

            ).toLowerCase();


            /* SEARCH CHECK */

            const matchesSearch =
                searchText === "" ||
                searchableText.includes(searchText);


            /* SHOW / HIDE */

            if (
                matchesFilter &&
                matchesSearch
            ) {

                card.classList.remove(
                    "hidden-game"
                );

            } else {

                card.classList.add(
                    "hidden-game"
                );

            }

        });

    }


    /* =========================
       SEARCH EVENT
    ========================= */

    if (searchBox) {

        searchBox.addEventListener(
            "input",
            updateGames
        );

    }


    /* =========================
       FILTER BUTTONS
    ========================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter || "all";

            updateGames();

        });

    });


    /* =========================
       INITIAL FILTER
    ========================= */

    const allButton =
        document.querySelector(
            '.filter-btn[data-filter="all"]'
        );

    if (allButton) {

        allButton.classList.add("active");

    }


    /* =========================
       GAME POPUP
    ========================= */

    const gamePopup =
        document.getElementById("gamePopup");

    const closeGamePopup =
        document.getElementById("closeGamePopup");

    const gameTitle =
        document.getElementById("gameTitle");

    const gameDescription =
        document.getElementById("gameDescription");

    const playGameBtn =
        document.getElementById("playGameBtn");


    if (
        gamePopup &&
        closeGamePopup &&
        gameTitle &&
        gameDescription &&
        playGameBtn
    ) {

        gameCards.forEach(card => {

            card.addEventListener("click", event => {

                /*
                 Don't open popup when
                 clicking Play Now or Favorite.
                */

                if (
                    event.target.closest("a") ||
                    event.target.closest("button")
                ) {
                    return;
                }


                const title =
                    card.querySelector("h3")
                    ?.textContent || "Game";


                const description =
                    card.querySelector("p")
                    ?.textContent ||
                    "Play this game on PlayNova.";


                const gameLink =
                    card.querySelector("a")
                    ?.href || "#";


                gameTitle.textContent =
                    title;

                gameDescription.textContent =
                    description;

                playGameBtn.href =
                    gameLink;


                gamePopup.style.display =
                    "flex";

            });

        });


        /* CLOSE GAME POPUP */

        closeGamePopup.addEventListener(
            "click",
            () => {

                gamePopup.style.display =
                    "none";

            }
        );


        /* CLOSE BY CLICKING OUTSIDE */

        gamePopup.addEventListener(
            "click",
            event => {

                if (
                    event.target === gamePopup
                ) {

                    gamePopup.style.display =
                        "none";

                }

            }
        );

    }


    /* =========================
       CONTACT FORM
       ========================= */

    const contactForm =
        document.querySelector(
            "#contactForm"
        ) || document.querySelector(
            "#contactform"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                const action =
                    contactForm.getAttribute(
                        "action"
                    );


                if (!action) {

                    event.preventDefault();

                    alert(
                        "⚠️ Contact form backend is not connected yet."
                    );

                    return;

                }

            }
        );

    }


    /* =========================
       SCROLL ANIMATION
    ========================= */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        document
            .querySelectorAll(
                ".game-card, .trend-card, .service, .review, .gallery img"
            )
            .forEach(item => {

                item.classList.add(
                    "animate-item"
                );

                observer.observe(item);

            });

    }


    /* =========================
       RUN SEARCH/FILTER
       ON PAGE LOAD
    ========================= */

    updateGames();

});
