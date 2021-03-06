﻿(function (app) {
    app.controller('productCategoryEditController', productCategoryEditController);

    productCategoryEditController.inject = ['apiService', '$scope', 'notificationService', '$state','$stateParams','commonService']

    function productCategoryEditController(apiService, $scope, notificationService, $state, $stateParams, commonService) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true
        }

        $scope.UpdateProductCategory = UpdateProductCategory;
        $scope.GetSeoTitle = GetSeoTitle;

        function GetSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        }

        function loadProductCategoryDetail() {
            apiService.get('/api/productcategory/getbyid/' + $stateParams.id,null, function (result) {
                $scope.productCategory = result.data;
            }, function (error) {
                notificationService.displayError(error.data);
            });
        }

        function UpdateProductCategory() {
            apiService.put('/api/productCategory/update', $scope.productCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật thành công.');
                    $state.go('product_categories');
                }, function (error) {
                    notificationService.displayError(' Cập nhật không thành công.');
                });
        }

        function loadParentCategory() {
            apiService.get('/api/productCategory/getallparents', null, function (result) {
                $scope.parentCategpries = result.data;
            }, function () {
                console.log('Cannot get list parent');
            });
        }
        loadParentCategory();
        loadProductCategoryDetail();
    }

})(angular.module('tnitshop.product_categories'));