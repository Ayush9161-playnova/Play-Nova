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
       GAME SEARCH
       Works on HOME + GAMES page
    ========================= */

    const searchBox = document.getElementById("searchBox");

    const gameCards = Array.from(
        document.querySelectorAll(".game-card")
    );

    function searchGames() {

        if (!searchBox || gameCards.length === 0) {
            return;
        }

        const searchText =
            searchBox.value
            .trim()
            .toLowerCase();

        gameCards.forEach(card => {

            const title =
                card.querySelector("h3")
                ?.textContent
                .toLowerCase() || "";

            const description =
                card.querySelector("p")
                ?.textContent
                .toLowerCase() || "";

            const category =
                card.className
                .toLowerCase();

            const matches =
                title.includes(searchText) ||
                description.includes(searchText) ||
                category.includes(searchText);

            card.style.display =
                matches ? "" : "none";

        });

    }

    if (searchBox) {

        searchBox.addEventListener(
            "input",
            searchGames
        );

    }


    /* =========================
       GAME FILTER
    ========================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    let currentFilter = "all";

    function filterGames(filter) {

        currentFilter = filter;

        gameCards.forEach(card => {

            const matchesFilter =
                filter === "all" ||
                card.classList.contains(filter);

            const searchText =
                searchBox
                ? searchBox.value
                    .trim()
                    .toLowerCase()
                : "";

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

            card.style.display =
                matchesFilter && matchesSearch
                ? ""
                : "none";

        });

    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter || "all";

            filterGames(filter);

        });

    });


    /* =========================
       SEARCH + FILTER TOGETHER
    ========================= */

    if (searchBox) {

        searchBox.addEventListener("input", () => {
            filterGames(currentFilter);
        });

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
                 * Agar user Play Now button par click kare
                 * to popup dobara open nahi hoga.
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

                gameTitle.textContent = title;

                gameDescription.textContent =
                    description;

                playGameBtn.href =
                    gameLink;

                gamePopup.style.display =
                    "flex";

            });

        });


        closeGamePopup.addEventListener(
            "click",
            () => {
                gamePopup.style.display = "none";
            }
        );


        gamePopup.addEventListener(
            "click",
            event => {

                if (event.target === gamePopup) {

                    gamePopup.style.display =
                        "none";

                }

            }
        );

    }


    /* =========================
       LOGIN
    ========================= */

    const loginBtn =
        document.getElementById("loginBtn");

    const loginPopup =
        document.getElementById("loginPopup");

    const closePopup =
        document.getElementById("closePopup");


    if (
        loginBtn &&
        loginPopup &&
        closePopup
    ) {

        loginBtn.addEventListener(
            "click",
            event => {

                /*
                 * Agar Login button profile.html
                 * par jana ho to popup ke bina bhi
                 * kaam kar sakta hai.
                 */

                if (
                    loginPopup.style.display !== "flex"
                ) {

                    event.preventDefault();

                    loginPopup.style.display =
                        "flex";

                }

            }
        );


        closePopup.addEventListener(
            "click",
            () => {

                loginPopup.style.display =
                    "none";

            }
        );


        loginPopup.addEventListener(
            "click",
            event => {

                if (
                    event.target === loginPopup
                ) {

                    loginPopup.style.display =
                        "none";

                }

            }
        );

    }


    /* =========================
       SIGNUP POPUP
    ========================= */

    const signupPopup =
        document.getElementById("signupPopup");

    const showSignup =
        document.getElementById("showSignup");

    const closeSignup =
        document.getElementById("closeSignup");


    if (
        signupPopup &&
        showSignup &&
        closeSignup
    ) {

        showSignup.addEventListener(
            "click",
            event => {

                event.preventDefault();

                if (loginPopup) {
                    loginPopup.style.display =
                        "none";
                }

                signupPopup.style.display =
                    "flex";

            }
        );


        closeSignup.addEventListener(
            "click",
            () => {

                signupPopup.style.display =
                    "none";

            }
        );


        signupPopup.addEventListener(
            "click",
            event => {

                if (
                    event.target === signupPopup
                ) {

                    signupPopup.style.display =
                        "none";

                }

            }
        );

    }


    /* =========================
       SIGNUP
    ========================= */

    const signupSubmit =
        document.getElementById("signupSubmit");

    if (signupSubmit) {

        signupSubmit.addEventListener(
            "click",
            () => {

                const username =
                    document.getElementById(
                        "signupUsername"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "signupEmail"
                    )?.value.trim();

                const password =
                    document.getElementById(
                        "signupPassword"
                    )?.value;


                if (
                    !username ||
                    !email ||
                    !password
                ) {

                    alert(
                        "Please fill all fields!"
                    );

                    return;

                }


                if (password.length < 6) {

                    alert(
                        "Password must contain at least 6 characters."
                    );

                    return;

                }


                localStorage.setItem(
                    "username",
                    username
                );

                localStorage.setItem(
                    "email",
                    email
                );

                /*
                 * IMPORTANT:
                 * This localStorage login is only
                 * for your current demo version.
                 * Real public authentication should
                 * use a backend/auth service.
                 */

                localStorage.setItem(
                    "password",
                    password
                );


                alert(
                    "✅ Account Created Successfully!"
                );


                if (signupPopup) {
                    signupPopup.style.display =
                        "none";
                }

                if (loginPopup) {
                    loginPopup.style.display =
                        "flex";
                }

            }
        );

    }


    /* =========================
       LOGIN SUBMIT
    ========================= */

    const loginSubmit =
        document.getElementById("loginSubmit");

    if (loginSubmit) {

        loginSubmit.addEventListener(
            "click",
            () => {

                const username =
                    document.getElementById(
                        "username"
                    )?.value.trim();

                const password =
                    document.getElementById(
                        "password"
                    )?.value;


                const savedUsername =
                    localStorage.getItem(
                        "username"
                    );

                const savedPassword =
                    localStorage.getItem(
                        "password"
                    );


                if (
                    username === savedUsername &&
                    password === savedPassword
                ) {

                    alert(
                        "✅ Login Successful!"
                    );


                    if (loginPopup) {
                        loginPopup.style.display =
                            "none";
                    }


                    if (loginBtn) {
                        loginBtn.textContent =
                            username;
                    }

                } else {

                    alert(
                        "❌ Invalid Username or Password!"
                    );

                }

            }
        );

    }


    /* =========================
       REMEMBER USER
    ========================= */

    if (loginBtn) {

        const savedUser =
            localStorage.getItem(
                "username"
            );

        if (savedUser) {

            loginBtn.textContent =
                savedUser;

        }

    }


    /* =========================
       LOGOUT
    ========================= */

    if (loginBtn) {

        loginBtn.addEventListener(
            "dblclick",
            () => {

                const savedUser =
                    localStorage.getItem(
                        "username"
                    );

                if (!savedUser) {
                    return;
                }


                if (
                    confirm(
                        "Do you want to Logout?"
                    )
                ) {

                    localStorage.removeItem(
                        "username"
                    );

                    localStorage.removeItem(
                        "email"
                    );

                    localStorage.removeItem(
                        "password"
                    );

                    location.reload();

                }

            }
        );

    }


    /* =========================
       CONTACT FORM
    ========================= */

    /*
     * IMPORTANT:
     * Ye code sirf form ko handle karta hai.
     * Isse email automatically PlayNova
     * email par nahi jaayega.
     *
     * Email bhejne ke liye Formspree,
     * EmailJS ya apna backend chahiye.
     */

    const contactForm =
        document.querySelector(
            "#contactForm"
        ) || document.querySelector(
            "form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                /*
                 * Agar form ke HTML mein
                 * action/backend nahi hai,
                 * browser ko fake success
                 * message nahi denge.
                 */

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

                /*
                 * action present hai to form
                 * normally submit hone denge.
                 */

            }
        );

    }


    /* =========================
       SCROLL ANIMATION
    ========================= */

    if (
        "IntersectionObserver"
        in window
    ) {

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
       INITIAL GAME FILTER
    ========================= */

    const allButton =
        document.querySelector(
            '.filter-btn[data-filter="all"]'
        );

    if (allButton) {

        allButton.classList.add(
            "active"
        );

    }


});

