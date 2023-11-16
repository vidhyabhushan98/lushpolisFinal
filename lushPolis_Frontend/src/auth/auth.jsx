import { BroadcastChannel } from 'broadcast-channel';
const logoutChannel = new BroadcastChannel('logout');
const loginchannel = new BroadcastChannel('login');

export const logout = () => {
    logoutChannel.postMessage("Logout")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("persist:root")
    window.location.href = window.location.origin + "/";
}

export const logoutAllTabs = () => {
    logoutChannel.onmessage = () => {
        logout();
        logoutChannel.close();
    }
}

export const login = () => {
    loginchannel.postMessage("Login")
    window.location.href = window.location.origin + "/";
}

export const loginAllTabs = () => {
    loginchannel.onmessage = () => {
        window.location.href = window.location.origin + "/";
        loginchannel.close();
    }
}

