!function(){"use strict";angular.module("app",["app.core","app.widgets","app.admin","app.dashboard","app.layout"])}(),function(){"use strict";angular.module("app.admin",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus"])}(),function(){"use strict";angular.module("app.dashboard",["app.core","app.widgets"])}(),function(){"use strict";angular.module("app.layout",["app.core"])}(),function(){"use strict";angular.module("app.widgets",[])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}();
!function(){"use strict";function AdminController(logger){function activate(){logger.info("Activated Admin View")}var vm=this;vm.title="Admin",activate()}angular.module("app.admin").controller("AdminController",AdminController),AdminController.$inject=["logger"]}(),function(){"use strict";function appRun(routerHelper){routerHelper.configureStates(getStates())}function getStates(){return[{state:"admin",config:{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"vm",title:"Admin",settings:{nav:2,content:'<i class="fa fa-lock"></i> Admin'}}}]}angular.module("app.admin").run(appRun),appRun.$inject=["routerHelper"]}(),function(){"use strict";function toastrConfig(toastr){toastr.options.timeOut=4e3,toastr.options.positionClass="toast-bottom-right"}function configure($logProvider,routerHelperProvider,exceptionHandlerProvider){$logProvider.debugEnabled&&$logProvider.debugEnabled(!0),exceptionHandlerProvider.configure(config.appErrorPrefix),routerHelperProvider.configure({docTitle:config.appTitle+": "})}var core=angular.module("app.core");core.config(toastrConfig),toastrConfig.$inject=["toastr"];var config={appErrorPrefix:"[hottowel Error] ",appTitle:"hottowel"};core.value("config",config),core.config(configure),configure.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function appRun(routerHelper){var otherwise="/404";routerHelper.configureStates(getStates(),otherwise)}function getStates(){return[{state:"404",config:{url:"/404",templateUrl:"app/core/404.html",title:"404"}}]}angular.module("app.core").run(appRun)}(),function(){"use strict";function dataservice($http,$q,exception,logger){function getMessageCount(){return $q.when(72)}function getPeople(){function success(response){return response.data}function fail(e){return exception.catcher("XHR Failed for getPeople")(e)}return $http.get("/api/people.json").then(success)["catch"](fail)}var service={getPeople:getPeople,getMessageCount:getMessageCount};return service}angular.module("app.core").factory("dataservice",dataservice),dataservice.$inject=["$http","$q","exception","logger"]}(),function(){"use strict";function DashboardController($q,dataservice,logger){function activate(){var promises=[getMessageCount(),getPeople()];return $q.all(promises).then(function(){logger.info("Activated Dashboard View")})}function getMessageCount(){return dataservice.getMessageCount().then(function(data){return vm.messageCount=data,vm.messageCount})}function getPeople(){return dataservice.getPeople().then(function(data){return vm.people=data,vm.people})}var vm=this;vm.news={title:"hottowel",description:"Hot Towel Angular is a SPA template for Angular developers."},vm.messageCount=0,vm.people=[],vm.title="Dashboard",activate()}angular.module("app.dashboard").controller("DashboardController",DashboardController),DashboardController.$inject=["$q","dataservice","logger"]}(),function(){"use strict";function appRun(routerHelper){routerHelper.configureStates(getStates())}function getStates(){return[{state:"dashboard",config:{url:"/",templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"vm",title:"dashboard",settings:{nav:1,content:'<i class="fa fa-dashboard"></i> Dashboard'}}}]}angular.module("app.dashboard").run(appRun),appRun.$inject=["routerHelper"]}(),function(){"use strict";function htSidebar(){function link(scope,element,attrs){function dropdown(e){var dropClass="dropy";e.preventDefault(),$dropdownElement.hasClass(dropClass)?$dropdownElement.hasClass(dropClass)&&($dropdownElement.removeClass(dropClass),$sidebarInner.slideUp(350,scope.whenDoneAnimating)):($sidebarInner.slideDown(350,scope.whenDoneAnimating),$dropdownElement.addClass(dropClass))}var $sidebarInner=element.find(".sidebar-inner"),$dropdownElement=element.find(".sidebar-dropdown a");element.addClass("sidebar"),$dropdownElement.click(dropdown)}var directive={link:link,restrict:"EA",scope:{whenDoneAnimating:"&?"}};return directive}angular.module("app.layout").directive("htSidebar",htSidebar)}(),function(){"use strict";function htTopNav(){function TopNavController(){}var directive={bindToController:!0,controller:TopNavController,controllerAs:"vm",restrict:"EA",scope:{navline:"="},templateUrl:"app/layout/ht-top-nav.html"};return directive}angular.module("app.layout").directive("htTopNav",htTopNav)}(),function(){"use strict";function ShellController($rootScope,$timeout,config,logger){function activate(){logger.success(config.appTitle+" loaded!",null),hideSplash()}function hideSplash(){$timeout(function(){$rootScope.showSplash=!1},1e3)}var vm=this;vm.busyMessage="Please wait ...",vm.isBusy=!0,$rootScope.showSplash=!0,vm.navline={title:config.appTitle,text:"Created by John Papa",link:"http://twitter.com/john_papa"},activate()}angular.module("app.layout").controller("ShellController",ShellController),ShellController.$inject=["$rootScope","$timeout","config","logger"]}(),function(){"use strict";function SidebarController($state,routerHelper){function activate(){getNavRoutes()}function getNavRoutes(){vm.navRoutes=states.filter(function(r){return r.settings&&r.settings.nav}).sort(function(r1,r2){return r1.settings.nav-r2.settings.nav})}function isCurrent(route){if(!route.title||!$state.current||!$state.current.title)return"";var menuName=route.title;return $state.current.title.substr(0,menuName.length)===menuName?"current":""}var vm=this,states=routerHelper.getStates();vm.isCurrent=isCurrent,activate()}angular.module("app.layout").controller("SidebarController",SidebarController),SidebarController.$inject=["$state","routerHelper"]}(),function(){"use strict";function htImgPerson(config){function link(scope,element,attrs){attrs.$observe("htImgPerson",function(value){value=basePath+(value||unknownImage),attrs.$set("src",value)})}var basePath=config.imageBasePath,unknownImage=config.unknownPersonImageSource,directive={link:link,restrict:"A"};return directive}angular.module("app.widgets").directive("htImgPerson",htImgPerson),htImgPerson.$inject=["config"]}(),function(){"use strict";function htWidgetHeader(){var directive={scope:{title:"@",subtitle:"@",rightText:"@",allowCollapse:"@"},templateUrl:"app/widgets/widget-header.html",restrict:"EA"};return directive}angular.module("app.widgets").directive("htWidgetHeader",htWidgetHeader)}(),function(){"use strict";function exceptionHandlerProvider(){this.config={appErrorPrefix:void 0},this.configure=function(appErrorPrefix){this.config.appErrorPrefix=appErrorPrefix},this.$get=function(){return{config:this.config}}}function config($provide){$provide.decorator("$exceptionHandler",extendExceptionHandler)}function extendExceptionHandler($delegate,exceptionHandler,logger){return function(exception,cause){var appErrorPrefix=exceptionHandler.config.appErrorPrefix||"",errorData={exception:exception,cause:cause};exception.message=appErrorPrefix+exception.message,$delegate(exception,cause),logger.error(exception.message,errorData)}}angular.module("blocks.exception").provider("exceptionHandler",exceptionHandlerProvider).config(config),config.$inject=["$provide"],extendExceptionHandler.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function exception($q,logger){function catcher(message){return function(e){var thrownDescription,newMessage;return e.data&&e.data.description&&(thrownDescription="\n"+e.data.description,newMessage=message+thrownDescription),e.data.description=newMessage,logger.error(newMessage),$q.reject(e)}}var service={catcher:catcher};return service}angular.module("blocks.exception").factory("exception",exception)}(),function(){"use strict";function logger($log,toastr){function error(message,data,title){toastr.error(message,title),$log.error("Error: "+message,data)}function info(message,data,title){toastr.info(message,title),$log.info("Info: "+message,data)}function success(message,data,title){toastr.success(message,title),$log.info("Success: "+message,data)}function warning(message,data,title){toastr.warning(message,title),$log.warn("Warning: "+message,data)}var service={showToasts:!0,error:error,info:info,success:success,warning:warning,log:$log.log};return service}angular.module("blocks.logger").factory("logger",logger),logger.$inject=["$log","toastr"]}(),function(){"use strict";function routerHelperProvider($locationProvider,$stateProvider,$urlRouterProvider){function RouterHelper($location,$rootScope,$state,logger){function configureStates(states,otherwisePath){states.forEach(function(state){state.config.resolve=angular.extend(state.config.resolve||{},config.resolveAlways),$stateProvider.state(state.state,state.config)}),otherwisePath&&!hasOtherwise&&(hasOtherwise=!0,$urlRouterProvider.otherwise(otherwisePath))}function handleRoutingErrors(){$rootScope.$on("$stateChangeError",function(event,toState,toParams,fromState,fromParams,error){if(!handlingStateChangeError){stateCounts.errors++,handlingStateChangeError=!0;var destination=toState&&(toState.title||toState.name||toState.loadedTemplateUrl)||"unknown target",msg="Error routing to "+destination+". "+(error.data||"")+". <br/>"+(error.statusText||"")+": "+(error.status||"");logger.warning(msg,[toState]),$location.path("/")}})}function init(){handleRoutingErrors(),updateDocTitle()}function getStates(){return $state.get()}function updateDocTitle(){$rootScope.$on("$stateChangeSuccess",function(event,toState,toParams,fromState,fromParams){stateCounts.changes++,handlingStateChangeError=!1;var title=config.docTitle+" "+(toState.title||"");$rootScope.title=title})}var handlingStateChangeError=!1,hasOtherwise=!1,stateCounts={errors:0,changes:0},service={configureStates:configureStates,getStates:getStates,stateCounts:stateCounts};return init(),service}var config={docTitle:void 0,resolveAlways:{}};$locationProvider.html5Mode(!0),this.configure=function(cfg){angular.extend(config,cfg)},this.$get=RouterHelper,RouterHelper.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",routerHelperProvider),routerHelperProvider.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}();