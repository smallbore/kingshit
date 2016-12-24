var app = angular.module('smallbore',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('index',{
		url:'/index',
		templateUrl:'template/smilegif.html'
	}).state('smilejpg',{
		url:'/smilejpg',
		templateUrl:'template/smilejpg.html'
	}).state('smiletext',{
		url:'/smiletext',
		templateUrl:'template/smiletext.html'
	}).state('smilepng',{
		url:'/smilepng',
		templateUrl:'template/smilepng.html'
	}).state('smilemore',{
		url:'/smilemore/:id',
		templateUrl:'template/smilemore.html',
		controller:'detailCtrl'
	})
	$urlRouterProvider.when('', '/index')
	
})

app.controller('smallCrtl', ['$scope', '$http', function ($scope, $http) {

        var page = 0;
        $scope.details = [];
        $scope.load = function () {
            page++;
//          url='https://route.showapi.com/341-3?showapi_appid=29409&showapi_sign=51a31659dce34a25842047fdba5e9c8c&page='+page;
            $http.get('info.php',{
            	params:{
            		page:page,
            	}
            }).success(function(data){
                 $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
//              console.log(data);
                //发送事件
//              $scope.$broadcast('scroll.infiniteScrollComplete');
            })
        };
        //事件接收
//      $scope.$on('stateChangeSuccess', function () {
//          console.log('触发事件');
//          $scope.load();
//      });
		$scope.loadMore = function() {
			$scope.load()
		};
        //初始调用
        $scope.load();
        
        //清空搜索框
        $scope.searchName = '';
		$scope.clearVal = function(){
			$scope.searchName = '';
		}
}]);

app.controller('tuwCrtl', ['$scope', '$http', function ($scope, $http) {
        var page = 0;
        $scope.details = [];
        $scope.load = function () {
            page++;
//          url='https://route.showapi.com/341-3?showapi_appid=29409&showapi_sign=51a31659dce34a25842047fdba5e9c8c&page='+page;
            $http.get('infow.php',{
            	params:{
            		page:page,
            	}
            }).success(function(data){
                 $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
//              console.log(data);
            })
        };
		$scope.loadMore = function() {
			$scope.load()
		};
        //初始调用
        $scope.load();
        
        //清空搜索框
        $scope.searchName = '';
		$scope.clearVal = function(){
			$scope.searchName = '';
		}
}]);
//文字笑话控制器
app.controller('wenCrtl', ['$scope', '$http','$sce', function ($scope, $http,$sce,formate) {
        var page = 0;
        $scope.details = [];
//      $scope.trustHtml =[];
        $scope.load = function () {
            page++;
//          url='https://route.showapi.com/341-3?showapi_appid=29409&showapi_sign=51a31659dce34a25842047fdba5e9c8c&page='+page;
            $http.get('infowz.php',{
            	params:{
            		page:page,
            	}
            }).success(function(data){
                $scope.details = $scope.details.concat(data.showapi_res_body.contentlist);
            })
        };
		$scope.loadMore = function() {
			$scope.load()
		};
        //初始调用
        $scope.load();
        
        //清空搜索框
        $scope.searchName = '';
		$scope.clearVal = function(){
			$scope.searchName = '';
		};
//		$scope.htmls = '<p>aagb</p>';
//		$scope.trustHtml = $sce.trustAsHtml($scope.html)
}])
//内涵图片控制器
app.controller('neihanCrtl', ['$scope', '$http', function ($scope, $http) {
        var page = 0;
        $scope.details = [];
        $scope.load = function () {
            page++;
//          url='https://route.showapi.com/341-3?showapi_appid=29409&showapi_sign=51a31659dce34a25842047fdba5e9c8c&page='+page;
            $http.get('infonh.php',{
            	params:{
            		page:page,
            	}
            }).success(function(data){
                 $scope.details = $scope.details.concat(data.showapi_res_body.pagebean.contentlist);
//              console.log($scope.details);
            })
        };
		$scope.loadMore = function() {
			$scope.load()
		};
        //初始调用
        $scope.load();
        
        //清空搜索框
        $scope.searchName = '';
		$scope.clearVal = function(){
			$scope.searchName = '';
		}
}])
//内涵详情页面
app.controller('detailCtrl', function ($scope, $state, $http) {
    var id = ($state.params.id);
//  console.log(id)
    $scope.load = function(){
    	var url = 'https://route.showapi.com/978-1?showapi_appid=29409&showapi_sign=51a31659dce34a25842047fdba5e9c8c&id=/xe/' + id + '.shtml&';
	    $http.get(url).success(function (data) {
	    	if(data.showapi_res_body==undefined){
	    		id = 7007659;
	    		$scope.load();
//	    		alert("施主点不了啦！")	
	    	}
	        $scope.img = (data.showapi_res_body);
	    })
    };
   
    $scope.loadNext = function(){
//  	console.log(111)
    	id = --id;
    	$scope.load()
    }
    $scope.load();
});
// 过滤P标签；
app.filter('formate',function($sce){
	return function(str){
		return $sce.trustAsHtml(str);
	}
})

app.filter('getNumber', function () {
    return function (str) {
        return str.match(/(\d+)/g)[0]
    }
});
//回到顶部指令
app.directive("backToTop", function () {  
        return {  
            restrict: "E",  
            link: function (scope, element, attr) {  
                var e = $(element);  
                $(window).scroll(function () {                 //滚动时触发  
                    if ($(document).scrollTop() > 300){         //获取滚动条到顶部的垂直高度,到相对顶部300px高度显示  
                        e.fadeIn(300)
                    }else{  
                        e.fadeOut(200);  
                    }
                });  
                /*点击回到顶部*/  
                e.click(function () {  
                    $('html, body').animate({                 //添加animate动画效果  
                        scrollTop: 0  
                    }, 1000);  
                });  
            }  
        };  
}); 