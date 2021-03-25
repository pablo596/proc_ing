@extends('app')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Clientes</h4>
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
                        <a href="#">Administración de Clientes</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-10">
                                    <h4 class="card-title">Clientes registrados en este sistema</h4>
                                </div>
                                <div class="col-2"><button class="ui button blue" id="add-cliente-btn">Añadir
                                        Cliente</button></div>
                            </div>
                        </div>
                        <div class="card-body">
                            <table id="basic-datatables" class="ui celled table blue table-responsive">
                                <thead>
                                    <tr>
                                        <th>Tipo de Identificación</th>
                                        <th>N° de Identificación</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Dirección</th>
                                        <th>Teléfono</th>
                                        <th>Correo </th>
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


    <div class="ui modal" id="add-cliente">
        <div class="header">Añadir Cliente</div>
        <i class="close icon"></i>
        <div class="content scrolling">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Tipo de documento</label>
                        <select name="" id="mod-tipo-doc" class="ui fluid dropdown">
                            <option value="">Seleccione el tipo de documenti</option>
                            <option value="1">Cédula</option>
                            <option value="2">RUC</option>
                            <option value="3">Pasaporte</option>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Documento</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-documento"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Nombre</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-nombre"></div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="">Apellidos</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-apellido"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Dirección</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-direccion"></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Teléfono</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-telefono"></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="">Correo</label>
                        <div class="ui fluid input"><input type="text" class="" id="mod-correo"></div>
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

    <script src="{{ asset('js/cliente.js') }}"></script>

@endsection
