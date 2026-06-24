document.addEventListener("DOMContentLoaded", () => {
    console.log("JS 실행 준비 완료 ");

    /* ========== 현재 클릭하고 있는 오브젝트 추적 ========== */
    document.addEventListener('click', (e) => {
        console.log('TOP TARGET', e.target);

    }, true);

    /* ========== header 영역 JS ========== */
    const header = document.querySelector(".header");
    const headerDim = document.querySelector(".header-dim");
    const gnbNav = document.querySelector(".gnb-nav");
    const gnbMoMenu = document.querySelector(".gnb-mobile-menu");
    const gnbMoClose = document.querySelector(".gnb-mobile-close");
    
    const gnb1depth = document.querySelector('.gnb-1depth');
    const gnbItem = document.querySelectorAll('.gnb-item');
    const gnb2depth = document.querySelectorAll('.gnb-2depth-btn');

    let scrollY = 0;
    const SCROLL_THRESHOLD = 10;

    const mq1024 = window.matchMedia('(min-width: 1024px)');



    /* ---------- 스크롤 시 헤더 색 변경 ---------- */
    function updateHeaderStyle() {
        if(!header) return;

        /* 얘가 여기 함수에 들어가는게 재사용성에 맞냐? */
        if(gnbNav.classList.contains("mo-open")) return;

        if(window.scrollY === 0) {
            header.classList.remove("is-scrolled");
        } else {
            header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
        }
    };

    /* ---------- 스크롤 락 ---------- */
    function lockScroll() {
        document.documentElement.classList.add("lock-scroll");
        document.body.classList.add("lock-scroll");
    };
    
    function unlockScroll() {
        document.documentElement.classList.remove("lock-scroll");
        document.body.classList.remove("lock-scroll");
    };

    /* 초기 상태 동기화 */
    updateHeaderStyle();

    /* 스크롤 시 헤더 상태 변경 */
    window.addEventListener("scroll", updateHeaderStyle, {passive: true});


    /* ---------- 모바일 메뉴 열기 ---------- */
    gnbMoMenu.addEventListener("click", () => {
        if(mq1024.matches) return;

        gnbNav.classList.add("mo-open");
        headerDim.classList.add("mo-open");
        lockScroll();
    });

    /* ---------- 모바일 메뉴 닫기 ---------- */
    function resetMobileMenu() {
        gnbNav.classList.remove("mo-open");
        headerDim.classList.remove("mo-open");
        
        unlockScroll()
        gnbRemove();
    } 

    gnbMoClose.addEventListener("click", () => {
        resetMobileMenu();
    });

    /* ---------- MO → PC 변경 감지  ---------- */
    mq1024.addEventListener("change", (e) => {
        if(e.matches) {
            resetMobileMenu();
        } else return;
    });

    /* ---------- 2depth 토글 ---------- */
    function gnbRemove() {
        gnbItem.forEach(b => {
            b.children[1].style.height = 0 + 'px';
        })
    }

    gnb1depth.addEventListener('mouseenter', () => {
        if(!mq1024.matches) return;

        header.classList.add('active');
        lockScroll();

    });
    header.addEventListener('mouseleave', () => {
        if(!mq1024.matches) return;

        header.classList.remove('active');
        unlockScroll();


    });
    /*
    gnbItem.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if(!mq1024.matches) return;

            btn.classList.add('active');
            header.classList.add('active');
            lockScroll();

            btn.children[1].style.height = btn.children[1].scrollHeight + 'px';
            
        });

        btn.addEventListener('mouseleave', () => {
            if(!mq1024.matches) return;
            
            btn.classList.remove('active');
            header.classList.remove('active');
            
            gnbRemove();
            unlockScroll();

        });
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if(mq1024.matches) return;
            
            const isActive = btn.classList.contains('active');
            btn.classList.remove('active');

            gnbRemove();
            
            if(!isActive) {
                btn.classList.add('active');
                btn.children[1].style.height = btn.children[1].scrollHeight + 'px';
            };
        });
    });

    */

    
    /* ========== main-visual 영역 JS ========== */
    const mainTitle = document.querySelectorAll(".visual-title");
    const mainSubTitle = document.querySelectorAll(".visual-subtitle");
    const mainColorClasses = ["slide-color-1", "slide-color-2", "slide-color-3"];
    
    mainTitle.forEach((slide, index) => {
        slide.classList.add(mainColorClasses[index]);
    });

    mainSubTitle.forEach((slide, index) => {
        slide.classList.add(mainColorClasses[index]);
    });


    /* ========== new 영역 JS ========== */
    const btnNewView = document.querySelectorAll(".new-area > .btn-new-view");
    const detailClose = document.querySelectorAll(".detail-close");
    
    const btnNewPositions = [
        { left : '18%', top: '67%' },
        { left : '43%', top: '62%' },
        { left : '66%', top: '58%' },
        { left : '25%', top: '80%' },
        { left : '70%', top: '70%' },
    ]
    
    function resetGroup(btnNewView, idx) {
        if(!mq1024.matches) return;

        if(idx < 3) {
            for(let k = 0; k < 3 && k < btnNewView.length; k++) {
                btnNewView[k].classList.remove("on");
            }
        } else {
            for(let k = 3; k < btnNewView.length; k++) {
                btnNewView[k].classList.remove("on");
            }
        }

    }

    if(mq1024.matches) {
        btnNewView[0].classList.add("on");
        btnNewView[3].classList.add("on");
    }

    btnNewView.forEach((btn, i) => {
        btn.style.left = btnNewPositions[i].left;
        btn.style.top = btnNewPositions[i].top;

        btn.addEventListener("click", () => {

            if(mq1024.matches) {
                resetGroup(btnNewView, i);
            }

            else {
                btnNewView.forEach(b => { b.classList.remove("on");}) 
            }

            btn.classList.add("on");
            const newSlide = btn.closest(".swiper-slide");
            if(!newSlide) return;
    
            const detailArea = newSlide.querySelector(".detail-area");
            if(!detailArea) return;

            const imgEl = detailArea.querySelector(".detail-img > img");
            const titleEl = detailArea.querySelector(".detail-title");
            const descEl = detailArea.querySelector(".detail-desc");
            const linkEl = detailArea.querySelector(".detail-link");
            
            const { title, desc, img, link } = btn.dataset;

            if(imgEl && img) {
                imgEl.src = img;
            }

            if(titleEl && title) {
                titleEl.textContent = title;
            }

            if(descEl && desc) {
                descEl.textContent = desc;
            }

            if(linkEl && link) {
                linkEl.href = link;
            }

            detailArea.classList.add("is-open");
        })
        
    });

    detailClose.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            const detailArea = closeBtn.closest(".detail-area");
            
            if(!detailArea) return

            detailArea.classList.remove("is-open");

            if(mq1024.matches) {
                resetGroup(btnNewView, i);
            }
            else {
                btnNewView.forEach(b => { b.classList.remove("on");}) 
            }

        });
    });



    /* ========== swiper 라이브러리 ========== */
    const swiperAll = document.querySelectorAll(".swiper");
    const swiperInstances = [];

    // 공통옵션
    const baseOption = {
        observer : true,
        observerParents : true,
        observerSlideChildren : true,
    };

    function getSwiperOption(el, type) {

        switch (type) {
            case "main":
                return {
                    ...baseOption,
                    loop: true,
                    // autoplay: { delay : 3000 },
                    // speed : 500,

                    pagination: {
                       el: el.querySelector(".swiper-pagination"),
                    },

                };
                
            case "category": 
                return {
                    ...baseOption,

                    breakpoints: {
                        0: {
                            slidesPerView : 4,

                            grid: {
                                rows: 2,
                                fill: "row",
                            },
                        },

                        1024: {
                            slidesPerView : 8,
                            grid: {
                                rows: 1,
                                fill: "column",
                            },
                        }
                    },
                };

            case "new":
                return {
                    ...baseOption,
                    loop: false,
                    spaceBetween: 16,

                    pagination: {
                       el: el.querySelector(".swiper-pagination"),
                    },
                };
            
            case "md":
                return {
                    ...baseOption,
                    loop: true,
                    spaceBetween: 16,
                    // autoplay: { delay : 3000 },
                    // speed : 500,
                    slidesPerView : 1,

                    pagination: {
                       el: el.querySelector(".swiper-pagination"),
                    },
                    
                    
                    breakpoints: {
                        768: {
                            spaceBetween: 20,
                            slidesPerView : "auto",
                        },
                    },
                };

            case "event":
                return {
                    ...baseOption,
                    
                    breakpoints: {
                        0: {
                            spaceBetween: 16,
                            slidesPerView : 2,
                            
                        },
                        674: {
                            slidesPerView : 4,
                            
                        },
                        1024: {
                            spaceBetween: 20,
                            slidesPerView : 4,
                            initialSlide: 1,


                        },
                    },

                };

            default: 
                return baseOption;
        };
    }

    swiperAll.forEach(el => {
        const option = getSwiperOption(el, el.dataset.type);
        const instance = new Swiper(el, option);
        swiperInstances.push(instance);
    });



    window.addEventListener('resize', () => {
        swiperInstances.forEach(sw => sw.update());
    })
});