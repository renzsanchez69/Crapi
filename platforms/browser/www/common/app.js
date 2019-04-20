$('#log-out').click(function(e){
    localStorage.removeItem("login_token");
    localStorage.removeItem("role");
    localStorage.removeItem("resto_id");
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    window.location.href = 'index.html';
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
