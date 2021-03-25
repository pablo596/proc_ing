@extends('app')

@section('content')
    <div class="content">
        <div class="panel-header bg-primary-gradient">
            <div class="page-inner py-5">
                <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                    <div>
                        <h2 class="text-white pb-2 fw-bold">Bienvenido {{ Session::get('name') }}</h2>
                        {{-- <h5 class="text-white op-7 mb-2">Free Bootstrap 4 Admin Dashboard</h5> --}}
                    </div>
                    {{-- <div class="ml-md-auto py-2 py-md-0">
                    <a href="#" class="btn btn-white btn-border btn-round mr-2">Manage</a>
                    <a href="#" class="btn btn-secondary btn-round">Add Customer</a>
                </div> --}}
                </div>
            </div>
        </div>

    </div>

    {{-- <input type="hidden" id="num_accidentes_anio" value="{{json_encode($num_accidentes_anio[0]->numero_accidentes)}}">
<input type="hidden" id="num_dias_sin_accidentes"
    value="{{(int)json_encode($num_dias_sin_accidentes[0]->numero_dias_sin_accidente)}}">
{{json_encode($num_dias_sin_accidentes[0]->numero_dias_sin_accidente)}} --}}
@endsection
@section('js')
    <script src="js/home.js"></script>
    <script>

    </script>
@endsection
