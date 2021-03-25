@extends('app')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Productos</h4>
                <ul class="breadcrumbs">
                    <li class="nav-home">
                        <a href="#">
                            <i class="flaticon-home"></i>
                        </a>
                    </li>
                    <li class="separator">
                        <i class="flaticon-right-arrow"></i>
                    </li>
                    <li class="nav-item">
                        <a href="#">Administración de Productos</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-10">
                                    <h4 class="card-title">Productos registrados en este sistema</h4>
                                </div>
                                <div class="col-2"><button class="ui button blue" id="add-producto-btn">Añadir
                                        Producto</button></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <table id="basic-datatables" class="ui celled table blue table-responsive">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descripción</th>
                                        <th>Stock</th>
                                        <th>Costo</th>
                                        <th>Precio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="ui modal" id="add-producto">
        <div class="header">Añadir Producto</div>
        <i class="close icon"></i>
        <div class="content scrolling">

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Código</label>
                        <div class="ui fluid input"><input type="text" style="text-transform: uppercase" id="mod-codigo">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Descripción</label>
                        <div class="ui fluid input"><input type="text" style="text-transform: uppercase"
                                id="mod-descripcion"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Stock</label>
                        <div class="ui fluid input"><input type="text" style="text-transform: uppercase" id="mod-stock">
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Costo</label>
                        <div class="ui fluid input"><input type="text" style="text-transform: uppercase" id="mod-costo">
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Precio</label>
                        <div class="ui fluid input"><input type="text" style="text-transform: uppercase" id="mod-precio">
                        </div>
                    </div>
                </div>
            </div>



        </div>
        <div class="actions">
            <button type="button" class="ui button blue btn-save" id="">Guardar</button>
        </div>
    </div>
@endsection
@section('js')

    <script src="{{ asset('js/producto.js') }}"></script>

@endsection
