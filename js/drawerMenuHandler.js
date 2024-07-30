const DrawerMenuHandler = (() => {
    const toggle = (id) => {
        const menuDOM = document.getElementById(id);
        let check = false;
        if (!menuDOM)
            return;
        if (menuDOM.classList.contains("opened")) {
            menuDOM.classList.remove("opened");
            CheckNavegationFixed();
        } else {
            menuDOM.classList.add("opened");
            CheckNavegationFixed();
        }
    };

    return {
        toggle,
    };
})();


function CheckNavegationFixed(){
    const headerWithDrawer = document.querySelector('header.with-drawer');

    if (!headerWithDrawer.classList.contains('hidden')) {
        headerWithDrawer.classList.add('hidden');
    } else{
        headerWithDrawer.classList.remove('hidden');
    }
}