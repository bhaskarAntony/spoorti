export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const SELECT_THEME = "SELECT_THEME";
export const SELECT_FONT_SIZE = "SELECT_FONT_SIZE";
export const MAIL_SELECT_BOX_FOLDER = "MAIL_SELECT_BOX_FOLDER";
export const SELECT_SUB_NAV = "SELECT_SUB_NAV";

export function toggleSidebar(payload) {
    return {
        type: TOGGLE_SIDEBAR,
        payload: payload
    };
}

export function selectLanguage(payload) {
    return {
        type: SELECT_LANGUAGE,
        payload: payload
    };
}

export function selectTheme(payload) {
    return {
        type: SELECT_THEME,
        payload: payload
    };
}

export function selectFontSize(payload) {
    return {
        type: SELECT_FONT_SIZE,
        payload: payload
    };
}

export function selectSubNav(payload) {
    return {
        type: SELECT_SUB_NAV,
        payload: payload
    };
}

export function mailSelectFolder(payload) {
    return {
        type: MAIL_SELECT_BOX_FOLDER,
        payload: payload
    };
}
