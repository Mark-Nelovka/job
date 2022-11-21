export default function getJobWithLocalStorage() {
    if (localStorage.getItem("changedAttributes")) {
        const itemsWithLocal = JSON.parse(localStorage.getItem("changedAttributes")!);
        if (itemsWithLocal.length > 0) {
            return itemsWithLocal;
        }
    }
    return null;
}