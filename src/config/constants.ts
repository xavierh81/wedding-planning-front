export const SiteRoutes = {
    HOME: "/",
    RSVP_FORM: "/rsvp",
    QA: "/q-a",
    GUEST_ACCOMODATIONS: "/guest-accomodations",
    THINGS_TO_DO: "/things-to-do"
}

export const DEFAULT_GRID = {
    xs: {span: 24, offset: 0},
    sm: {span: 24, offset: 0},
    md: {span: 22, offset: 1},
    lg: {span: 22, offset: 1},
    xl: {span:20, offset: 2},
    xxl: {span: 16, offset: 4}
}

export const DEFAULT_SMALL_GRID = {
    xs: {span: 24, offset: 0},
    sm: {span: 20, offset: 2},
    md: {span: 18, offset: 3},
    lg: {span: 16, offset: 4},
    xl: {span:12, offset: 6},
    xxl: {span: 10, offset: 7}
}

export enum WeddingPersonKind {
    ADULT = 1,
    KID = 2,
    BABY = 3
}