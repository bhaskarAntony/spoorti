
import { TOGGLE_SIDEBAR, SELECT_LANGUAGE, SELECT_THEME, MAIL_SELECT_BOX_FOLDER, SELECT_SUB_NAV, SELECT_FONT_SIZE } from "./action";

const initState = {
    sidebarOpen: false,
    mailSelectBoxFolder: 'Inbox',
    selectedLanguage: localStorage.getItem('selected_language') || 'en_in',
    selectedTheme: localStorage.getItem('selected_theme') || 'light',
    selectedFontSize: localStorage.getItem('selected_font_size') || 2,
    selectedSubNav: 0
}

export function commonReducer (state = initState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                // settingsOpen: false,
                // userProfileOpen: false,
                sidebarOpen: action.payload,
            };
        
        case SELECT_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.payload,
            };

        case SELECT_THEME:
            return {
                ...state,
                selectedTheme: action.payload,
            };
            
        case SELECT_FONT_SIZE:
            return {
                ...state,
                selectedFontSize: action.payload,
            };
            
        case SELECT_SUB_NAV:
            return {
                ...state,
                selectedSubNav: action.payload,
            };
            
        case MAIL_SELECT_BOX_FOLDER:
            return {
                ...state,
                mailSelectBoxFolder: action.payload,
            };

        default:
            return state;
    }
}