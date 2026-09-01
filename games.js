document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const searchBox = document.getElementById("searchBox");

    const gameCards = [
        ...document.querySelectorAll(".game-card")
    ];

    const filterButtons = [
        ...document.querySelectorAll(".filter-btn")
    ];

    let activeFilter = "all";


    // ==========================================
    // SEARCH + FILTER
    // ==========================================

    function updateGames() {

        const searchText = searchBox
            ? searchBox.value.trim().toLowerCase()
            : "";


        gameCards.forEach(card => {

            const title =
                card.querySelector("h3")
                    ?.textContent
                    .toLowerCase() || "";


            const description =
                card.querySelector("p")
                    ?.textContent
                    .toLowerCase() || "";


            const matchesSearch =
                searchText === "" ||
                title.includes(searchText) ||
                description.includes(searchText);


            const matchesFilter =
                activeFilter === "all" ||
                card.classList.contains(activeFilter);


            if (matchesSearch && matchesFilter) {

                card.classList.remove("hidden-game");

            } else {

                card.classList.add("hidden-game");

            }

        });

    }


    // ==========================================
    // SEARCH
    // ==========================================

    if (searchBox) {

        searchBox.addEventListener(
            "input",
            updateGames
        );

    }


    // ==========================================
    // FILTER BUTTONS
    // ==========================================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            activeFilter =
                button.dataset.filter || "all";


            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            updateGames();

        });

    });


    // ==========================================
    // FAVORITES
    // ==========================================

    let favorites = [];

    try {

        favorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

    } catch (error) {

        favorites = [];

    }


    // ==========================================
    // SAVE FAVORITES
    // ==========================================

    function saveFavorites() {

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    }


    // ==========================================
    // CHECK FAVORITE
    // ==========================================

    function isFavorite(title) {

        return favorites.some(game => {

            if (typeof game === "string") {

                return game === title;

            }

            return game.title === title;

        });

    }


    // ==========================================
    // UPDATE FAVORITE BUTTONS
    // ==========================================

    function updateFavoriteButtons() {

        document
            .querySelectorAll(".favorite-btn")
            .forEach(button => {

                const card =
                    button.closest(".game-card");

                if (!card) return;


                const title =
                    card.querySelector("h3")
                        ?.textContent
                        .trim();


                if (isFavorite(title)) {

                    button.textContent = "♥";

                    button.classList.add(
                        "favorited"
                    );

                    button.title =
                        "Remove from Favorites";

                } else {

                    button.textContent = "♡";

                    button.classList.remove(
                        "favorited"
                    );

                    button.title =
                        "Add to Favorites";

                }

            });

    }


    // ==========================================
    // FAVORITE BUTTON CLICK
    // ==========================================

    document
        .querySelectorAll(".favorite-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const card =
                        button.closest(".game-card");

                    if (!card) return;


                    const title =
                        card.querySelector("h3")
                            ?.textContent
                            .trim();


                    const image =
                        card.querySelector("img")
                            ?.getAttribute("src") || "";


                    const existingIndex =
                        favorites.findIndex(game => {

                            if (
                                typeof game ===
                                "string"
                            ) {

                                return game === title;

                            }

                            return game.title === title;

                        });


                    // REMOVE FAVORITE

                    if (existingIndex !== -1) {

                        favorites.splice(
                            existingIndex,
                            1
                        );

                    }

                    // ADD FAVORITE

                    else {

                        favorites.push({

                            title: title,

                            image: image

                        });

                    }


                    saveFavorites();

                    updateFavoriteButtons();

                }
            );

        });


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuBtn =
        document.querySelector(".menu-btn");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );

            }
        );


        document
            .querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    updateGames();

    updateFavoriteButtons();

});