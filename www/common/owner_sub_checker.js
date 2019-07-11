if (CrapiApp.config.login_data.role == USER_ROLE.owner) {
	CrapiApp.getOwnerInfo({
		id: CrapiApp.config.login_data.user_id
	})
	.then(function(res){
		console.log(res);

		if (res.result === 'OK') {
			if (res.data.is_expired) {
				location.href = 'o-sub.html';
			}
		}
	})
	.always(function(){
		CrapiApp.removeCommonLoader();
	});
}