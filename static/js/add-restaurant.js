$(function () {
	var trim = $.trim;
	
	$('#form-new-restaurant')
	.on('submit', function () {
		var $self = $(this);
		var $name = $('#restaurant-name');
		var $menu = $('#hidden-menu');
		var menu = [];
		$self.find('.menu').each(function (index, element) {
			var $meal = $(element);
			var $name = $meal.find('.meal-name');
			var $price = $meal.find('.meal-price');
			if (trim($name.val()) && trim($price.val())) {
				menu.push({
					name: $name.val(),
					price: $price.val()
				});
			}
		});
		$menu.val(JSON.stringify(menu));
		if (!trim($name.val()) || !menu.length) {
			return false;
		}
	})
	.on('click', '.add-menu', function () {
		var $self = $(this);
		var $currentMenu = $self.closest('.menu');
		var $currentName = $currentMenu.find('.meal-name');
		var $currentPrice = $currentMenu.find('.meal-price');
		
		if (!trim($currentName.val()) || !trim($currentPrice.val())) {
			return;
		}
		
		var $newMenu = $currentMenu.clone();
		$currentMenu.find('.add-menu').remove();
		$currentMenu.append('<button class="del-menu btn btn-danger">删除菜单</button>');
		$currentMenu.after($newMenu);
		$newMenu.find('.meal-name').val('').focus();
		$newMenu.find('.meal-price').val('');
	})
	.on('click', '.del-menu', function () {
		var $self = $(this);
		$self.closest('.menu').remove();
	})
	.find('.form-group.menu').last().append('<button class="add-menu btn btn-default">添加菜单</button>')
	.siblings('.form-group.menu').append('<button class="del-menu btn btn-danger">删除菜单</button>');
});