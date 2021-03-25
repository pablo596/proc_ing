<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Altaria | Sistema de Ventas</title>
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
    <link rel="icon" href="{{ asset('assets/img/icon.ico') }}" type="image/x-icon" />

    <!-- Fonts and icons -->
    <script src="{{ asset('assets/js/plugin/webfont/webfont.min.js') }}"></script>
    <script>
        WebFont.load({
            google: {
                "families": ["Lato:300,400,700,900"]
            },
            custom: {
                "families": ["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular",
                    "Font Awesome 5 Brands", "simple-line-icons"
                ],
                urls: ['../assets/css/fonts.min.css']
            },
            active: function() {
                sessionStorage.fonts = true;
            }
        });

    </script>


    <!-- CSS Files -->
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/atlantis.min.css') }}">

    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}">

    {{-- SweetAlert2 --}}
    <link rel="stylesheet" href="{{ asset('node_modules/sweetalert2/dist/sweetalert2.min.css') }}">
    {{-- Custom Style --}}
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    {{-- fileinput --}}
    {{-- <link href="{{asset('node_modules/fileinput/css/fileinput.css')}}" media="all" rel="stylesheet" type="text/css"
    />
    <link href="{{asset('node_modules/fileinput/themes/explorer-fas/theme.css')}}" media="all" rel="stylesheet"
        type="text/css" /> --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/css/fileinput.css" media="all"
        rel="stylesheet" type="text/css" />

    {{-- fancybox --}}
    <link rel="stylesheet" href="{{ asset('fancybox-2.1.7/source/jquery.fancybox.css?v=2.1.7') }}" type="text/css"
        media="screen" />
    <link rel="stylesheet" href="{{ asset('fancybox-2.1.7/source/helpers/jquery.fancybox-buttons.css?v=1.0.5') }}"
        type="text/css" media="screen" />
    <link rel="stylesheet" href="{{ asset('fancybox-2.1.7/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7') }}"
        type="text/css" media="screen" />

    {{-- Datepicker --}}
    <link rel="stylesheet" href="{{ asset('node_modules/@chenfengyuan/datepicker/dist/datepicker.css') }}">
    <link rel="stylesheet" href="{{ asset('css/yearpicker.css') }}">

    {{-- Search Semantic --}}
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-search/search.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-dropdown/dropdown.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-transition/transition.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-input/input.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-table/table.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-icon/icon.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-accordion/accordion.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-modal/modal.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-dimmer/dimmer.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-checkbox/checkbox.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-label/label.min.css') }}">
    <link rel="stylesheet" href="{{ asset('node_modules/semantic-ui-button/button.min.css') }}">

    {{-- DataTable Semantic --}}
    <link rel="stylesheet" href="{{ asset('css/dataTables.semanticui.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/buttons.semanticui.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/semantic.min.css') }}">

</head>

<body>
    <input type="hidden" name="_token" value="{{ csrf_token() }}" id="csrf-token">
    <div class="wrapper">
        <div class="main-header">
            <!-- Logo Header -->
            <div class="logo-header" data-background-color="blue">

                <a href="/" class="logo">
                    {{-- <img src="{{asset('assets/img/logo2.png')}}" width="80%" alt="navbar brand" class="navbar-brand"> --}}
                    <span class="navbar-brand">Altaria</span>
                </a>
                <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse"
                    data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="icon-menu"></i>
                    </span>
                </button>
                <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar">
                        <i class="icon-menu"></i>
                    </button>
                </div>
            </div>
            <!-- End Logo Header -->

            <!-- Navbar Header -->
            <nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

                <div class="container-fluid">
                    <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
                        <li class="nav-item dropdown hidden-caret">
                            <a class="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bell"></i>
                                <span class="notification"></span>
                            </a>
                            <ul class="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown">
                                <li>
                                    <div class="dropdown-title" id="numero_notificaciones">
                                    </div>
                                </li>
                                <li>
                                    <div class="notif-scroll scrollbar-outer">
                                        <div class="notif-center">
                                            {{-- <a href="#">
                                                <div class="notif-icon notif-primary"> <i class="fa fa-user-plus"></i>
                                                </div>
                                                <div class="notif-content">
                                                    <span class="block">
                                                        New user registered
                                                    </span>
                                                    <span class="time">5 minutes ago</span>
                                                </div>
                                            </a>
                                            <a href="#">
                                                <div class="notif-icon notif-success"> <i class="fa fa-comment"></i>
                                                </div>
                                                <div class="notif-content">
                                                    <span class="block">
                                                        Rahmad commented on Admin
                                                    </span>
                                                    <span class="time">12 minutes ago</span>
                                                </div>
                                            </a>
                                            <a href="#">
                                                <div class="notif-img">
                                                    <img src="../assets/img/profile2.jpg" alt="Img Profile">
                                                </div>
                                                <div class="notif-content">
                                                    <span class="block">
                                                        Reza send messages to you
                                                    </span>
                                                    <span class="time">12 minutes ago</span>
                                                </div>
                                            </a>
                                            <a href="#">
                                                <div class="notif-icon notif-danger"> <i class="fa fa-heart"></i> </div>
                                                <div class="notif-content">
                                                    <span class="block">
                                                        Farrah liked Admin
                                                    </span>
                                                    <span class="time">17 minutes ago</span>
                                                </div>
                                            </a> --}}
                                        </div>
                                    </div>
                                </li>
                                {{-- <li>
                                    <a class="see-all" href="javascript:void(0);">See all notifications<i
                                            class="fa fa-angle-right"></i> </a>
                                </li> --}}
                            </ul>
                        </li>
                        <li class="nav-item dropdown hidden-caret">
                            <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"
                                aria-expanded="false">
                                <div class="avatar-sm">
                                    <img src="../assets/img/logo-white.png" alt="..." class="avatar-img rounded-circle">
                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-user animated fadeIn">
                                <div class="dropdown-user-scroll scrollbar-outer">
                                    <li>
                                        <div class="user-box">
                                            <div class="avatar-lg"><img src="../assets/img/logo-white.png"
                                                    alt="image profile" class="avatar-img rounded"></div>
                                            <div class="u-text">
                                                <h4>{{ Session::get('name') }}</h4>
                                                <p class="text-muted">{{ Session::get('correo') }}</p><a
                                                    href="/usuarios" class="btn btn-xs btn-secondary btn-sm">Ver
                                                    perfil</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="/usuarios">Mi perfil</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="/logout" style="color: #f02b2b">Cerrar Sesión</a>
                                    </li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- End Navbar -->
        </div>

        <!-- Sidebar -->
        <div class="sidebar sidebar-style-2">
            <div class="sidebar-wrapper scrollbar scrollbar-inner">
                <div class="sidebar-content">
                    <div class="user">
                        <div class="avatar-sm float-left mr-2">
                            <img src="../assets/img/logo-white.png" alt="..." class="avatar-img rounded-circle">
                        </div>
                        <div class="info">
                            <a data-toggle="">
                                <span>
                                    {{ Session::get('name') }}
                                    <span class="user-level">{{ Session::get('tiponom') }}</span>
                                    {{-- <span class="caret"></span> --}}
                                </span>
                            </a>
                            <div class="clearfix"></div>

                            {{-- <div class="collapse in" id="collapseExample">
                                <ul class="nav">
                                    <li>
                                        <a href="/usuarios">
                                            <span class="link-collapse">Mi perfil</span>
                                        </a>
                                    </li>
                                </ul>
                            </div> --}}
                        </div>
                    </div>
                    <ul class="nav nav-primary">
                        <li class="nav-section">
                            <span class="sidebar-mini-icon">
                                <i class="fa fa-ellipsis-h"></i>
                            </span>
                            <h4 class="text-section">Menú</h4>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#cliente">
                                <i class="fas fa-users"></i>
                                <p>Clientes</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="cliente">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="/clientes">
                                            <span class="sub-item">Administración de Clientes</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#producto">
                                <i class="fas fa-users"></i>
                                <p>Productos</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="producto">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="/productos">
                                            <span class="sub-item">Administración de Productos</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {{-- <li class="nav-item">
                            <a data-toggle="collapse" href="#proveedor">
                                <i class="fas fa-address-book"></i>
                                <p>Proveedores</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="proveedor">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="/proveedores">
                                            <span class="sub-item">Administración de Proveedores</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#ventas">
                                <i class="fas fa-file-invoice-dollar"></i>
                                <p>Ventas</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="ventas">
                                <ul class="nav nav-collapse">
                                    <li>
                                        <a href="/pedidos">
                                            <span class="sub-item">Pedido</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/ventas">
                                            <span class="sub-item">Venta</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li> --}}
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Sidebar -->

        <div class="main-panel">
            @yield('content')
            <footer class="footer">
                <div class="container-fluid">
                    <nav class="pull-left">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Canteras Uruzca
                                </a>
                            </li>
                            {{-- <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Help
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Licenses
                                </a>
                            </li> --}}
                        </ul>
                    </nav>
                    <div class="copyright ml-auto">
                        2020, Realizado por <a href="https://www.paedpaal.com">PAEDPAAL</a>
                    </div>
                </div>
            </footer>
        </div>

        <!-- Custom template | don't include it in your project! -->
        <div class="custom-template">
            <div class="title">Settings</div>
            <div class="custom-content">
                <div class="switcher">
                    <div class="switch-block">
                        <h4>Logo Header</h4>
                        <div class="btnSwitch">
                            <button type="button" class="changeLogoHeaderColor" data-color="dark"></button>
                            <button type="button" class="selected changeLogoHeaderColor" data-color="blue"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="purple"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="light-blue"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="green"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="orange"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="red"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="white"></button>
                            <br />
                            <button type="button" class="changeLogoHeaderColor" data-color="dark2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="blue2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="purple2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="light-blue2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="green2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="orange2"></button>
                            <button type="button" class="changeLogoHeaderColor" data-color="red2"></button>
                        </div>
                    </div>
                    <div class="switch-block">
                        <h4>Navbar Header</h4>
                        <div class="btnSwitch">
                            <button type="button" class="changeTopBarColor" data-color="dark"></button>
                            <button type="button" class="changeTopBarColor" data-color="blue"></button>
                            <button type="button" class="changeTopBarColor" data-color="purple"></button>
                            <button type="button" class="changeTopBarColor" data-color="light-blue"></button>
                            <button type="button" class="changeTopBarColor" data-color="green"></button>
                            <button type="button" class="changeTopBarColor" data-color="orange"></button>
                            <button type="button" class="changeTopBarColor" data-color="red"></button>
                            <button type="button" class="changeTopBarColor" data-color="white"></button>
                            <br />
                            <button type="button" class="changeTopBarColor" data-color="dark2"></button>
                            <button type="button" class="selected changeTopBarColor" data-color="blue2"></button>
                            <button type="button" class="changeTopBarColor" data-color="purple2"></button>
                            <button type="button" class="changeTopBarColor" data-color="light-blue2"></button>
                            <button type="button" class="changeTopBarColor" data-color="green2"></button>
                            <button type="button" class="changeTopBarColor" data-color="orange2"></button>
                            <button type="button" class="changeTopBarColor" data-color="red2"></button>
                        </div>
                    </div>
                    <div class="switch-block">
                        <h4>Sidebar</h4>
                        <div class="btnSwitch">
                            <button type="button" class="selected changeSideBarColor" data-color="white"></button>
                            <button type="button" class="changeSideBarColor" data-color="dark"></button>
                            <button type="button" class="changeSideBarColor" data-color="dark2"></button>
                        </div>
                    </div>
                    <div class="switch-block">
                        <h4>Background</h4>
                        <div class="btnSwitch">
                            <button type="button" class="changeBackgroundColor" data-color="bg2"></button>
                            <button type="button" class="changeBackgroundColor selected" data-color="bg1"></button>
                            <button type="button" class="changeBackgroundColor" data-color="bg3"></button>
                            <button type="button" class="changeBackgroundColor" data-color="dark"></button>
                        </div>
                    </div>
                </div>
            </div>
            {{-- <div class="custom-toggle">
                <i class="flaticon-settings"></i>
            </div> --}}
        </div>
        <!-- End Custom template -->
    </div>
    <!--   Core JS Files   -->
    <script src="{{ asset('assets/js/core/jquery.3.2.1.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('jquery/dist/jquery.min.js') }}"></script>
    <script src="../assets/js/core/popper.min.js"></script>
    <script src="../assets/js/core/bootstrap.min.js"></script>

    <!-- jQuery UI -->
    <script src="../assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    <script src="../assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>

    <!-- jQuery Scrollbar -->
    <script src="../assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>


    <!-- Chart JS -->
    <script src="../assets/js/plugin/chart.js/chart.min.js"></script>

    <!-- jQuery Sparkline -->
    <script src="../assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js"></script>

    <!-- Chart Circle -->
    <script src="../assets/js/plugin/chart-circle/circles.min.js"></script>

    <!-- Datatables -->
    {{-- <script src="../assets/js/plugin/datatables/datatables.min.js"></script> --}}

    <!-- Bootstrap Notify -->
    <script src="../assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></script>

    <!-- jQuery Vector Maps -->
    <script src="../assets/js/plugin/jqvmap/jquery.vmap.min.js"></script>
    <script src="../assets/js/plugin/jqvmap/maps/jquery.vmap.world.js"></script>

    <!-- Sweet Alert -->
    <script src="../assets/js/plugin/sweetalert/sweetalert.min.js"></script>

    <!-- Atlantis JS -->
    <script src="../assets/js/atlantis.min.js"></script>

    <!-- Atlantis DEMO methods, don't include it in your project! -->
    <script src="../assets/js/setting-demo.js"></script>

    {{-- SweetAlert2 --}}
    <script src="{{ asset('node_modules/sweetalert2/dist/sweetalert2.min.js') }}"></script>

    {{-- Menu JS --}}
    <script src="{{ asset('js/menu.js') }}"></script>

    <script src="{{ asset('js/fileinput.js') }}" type="text/javascript">
    </script>

    {{-- fileinput --}}
    {{-- <script src="{{asset('node_modules/fileinput/js/fileinput.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/fileinput/js/locales/es.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/fileinput/themes/fas/theme.js')}}" type="text/javascript"></script>
    <script src="{{asset('node_modules/fileinput/themes/explorer-fas/theme.js')}}" type="text/javascript"></script> --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/js/fileinput.js"
        type="text/javascript"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.7/themes/fa/theme.js"
        type="text/javascript"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" type="text/javascript">
    </script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" type="text/javascript">
    </script>

    <!-- Add mousewheel plugin (this is optional) -->
    <script type="text/javascript" src="{{ asset('fancybox-2.1.7/lib/jquery.mousewheel.pack.js') }}"></script>
    <script type="text/javascript" src="{{ asset('fancybox-2.1.7/source/jquery.fancybox.pack.js?v=2.1.7') }}">
    </script>
    <script type="text/javascript"
        src="{{ asset('fancybox-2.1.7/source/helpers/jquery.fancybox-buttons.js?v=1.0.5') }}">
    </script>
    <script type="text/javascript"
        src="{{ asset('fancybox-2.1.7/source/helpers/jquery.fancybox-media.js?v=1.0.6') }}">
    </script>
    <script type="text/javascript"
        src="{{ asset('fancybox-2.1.7/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7') }}">
    </script>

    {{-- DatePicker --}}
    <script src="{{ asset('node_modules/@chenfengyuan/datepicker/dist/datepicker.js') }}"></script>
    <script src="{{ asset('js/yearpicker.js') }}"></script>

    {{-- Search semantic --}}
    <script src="{{ asset('node_modules/semantic-ui-transition/transition.js') }}"></script>
    <script src="{{ asset('node_modules/semantic-ui-search/search.js') }}"></script>
    <script src="{{ asset('node_modules/semantic-ui-dropdown/dropdown.js') }}"></script>
    {{-- <script src="{{asset('node_modules/semantic-ui-input/input.js')}}"></script> --}}
    <script src="{{ asset('node_modules/semantic-ui-accordion/accordion.js') }}"></script>
    <script src="{{ asset('node_modules/semantic-ui-modal/modal.js') }}"></script>
    <script src="{{ asset('node_modules/semantic-ui-dimmer/dimmer.js') }}"></script>
    <script src="{{ asset('node_modules/semantic-ui-checkbox/checkbox.js') }}"></script>

    {{-- DataTable semantic --}}

    <script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('node_modules/datatables.net-se/js/dataTables.semanticui.min.js') }}"></script>
    <script src="{{ asset('node_modules/datatables.net-buttons-se/js/buttons.semanticui.min.js') }}"></script>
    <script src="{{ asset('js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('js/jszip.min.js') }}"></script>
    <script src="{{ asset('js/pdfmake.min.js') }}"></script>
    <script src="{{ asset('js/vfs_fonts.js') }}"></script>
    <script src="{{ asset('js/buttons.html5.min.js') }}"></script>
    <script src="{{ asset('js/buttons.print.min.js') }}"></script>
    <script src="{{ asset('js/buttons.colVis.min.js') }}"></script>
    <script src="{{ asset('js/custom-carousel.js') }}"></script>
    <script src="{{ asset('highcharts/highcharts.js') }}"></script>
    <script>
        // $(".ui.search").search({});
        $('.ui.modal').modal();
        $('.ui.dropdown').dropdown();
        $('#kvFileinputModal').hide();
        $('#kvFileinputModal').css("display", "none");
        // console.log($(".dt-buttons"));

    </script>
    {{-- <script>
        Circles.create({
			id:'circles-1',
			radius:45,
			value:60,
			maxValue:100,
			width:7,
			text: 5,
			colors:['#f1f1f1', '#FF9E27'],
			duration:400,
			wrpClass:'circles-wrp',
			textClass:'circles-text',
			styleWrapper:true,
			styleText:true
		})

		Circles.create({
			id:'circles-2',
			radius:45,
			value:70,
			maxValue:100,
			width:7,
			text: 36,
			colors:['#f1f1f1', '#2BB930'],
			duration:400,
			wrpClass:'circles-wrp',
			textClass:'circles-text',
			styleWrapper:true,
			styleText:true
		})

		Circles.create({
			id:'circles-3',
			radius:45,
			value:40,
			maxValue:100,
			width:7,
			text: 12,
			colors:['#f1f1f1', '#F25961'],
			duration:400,
			wrpClass:'circles-wrp',
			textClass:'circles-text',
			styleWrapper:true,
			styleText:true
		})

		var totalIncomeChart = document.getElementById('totalIncomeChart').getContext('2d');

		var mytotalIncomeChart = new Chart(totalIncomeChart, {
			type: 'bar',
			data: {
				labels: ["S", "M", "T", "W", "T", "F", "S", "S", "M", "T"],
				datasets : [{
					label: "Total Income",
					backgroundColor: '#ff9e27',
					borderColor: 'rgb(23, 125, 255)',
					data: [6, 4, 9, 5, 4, 6, 4, 3, 8, 10],
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						ticks: {
							display: false //this will remove only the label
						},
						gridLines : {
							drawBorder: false,
							display : false
						}
					}],
					xAxes : [ {
						gridLines : {
							drawBorder: false,
							display : false
						}
					}]
				},
			}
		});

		$('#lineChart').sparkline([105,103,123,100,95,105,115], {
			type: 'line',
			height: '70',
			width: '100%',
			lineWidth: '2',
			lineColor: '#ffa534',
			fillColor: 'rgba(255, 165, 52, .14)'
		});
    </script> --}}
    <script>
        $("#numero_notificaciones").html("No tiene nuevas notificaciones");
        $(".fancybox-thumb").fancybox({
            prevEffect: "none",
            nextEffect: "none",
            helpers: {
                title: {
                    type: "outside",
                },
                thumbs: {
                    width: 100,
                    height: 100,
                },
            },
        });

    </script>
    @yield('js')
</body>

</html>
