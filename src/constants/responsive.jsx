const responsive = {
    grid2to6: {
        base: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)",
        xl: "repeat(6, 1fr)"
    },
    grid346: {
        base: "repeat(2, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)",
        xl: "repeat(6, 1fr)"
    },
    grid23: {
        base: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)"
    },
    grid2to5: {
        base: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)'
    },
    carouselResponsive: {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 568 }, items: 1 },
        mobile: { breakpoint: { max: 568, min: 0 }, items: 1 }
    },
    carouselList: {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7, partialVisibilityGutter: 40 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6, partialVisibilityGutter: 40 },
        tablet: { breakpoint: { max: 1024, min: 568 }, items: 4, partialVisibilityGutter: 30 },
        mobile: { breakpoint: { max: 568, min: 0 }, items: 2, partialVisibilityGutter: 30 }
    }
};

export default responsive