import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFechaForQuery, mainEndpoint } from './utils';

@Injectable({
  providedIn: 'root',
})

export class FacturaService {
  private api: string = mainEndpoint + "/stock-nutrinatalia/servicio";
  private apiFicha: string = mainEndpoint + "/stock-nutrinatalia/fichaClinica";
  private urlApiProduct: string = mainEndpoint + "/stock-nutrinatalia/producto";
  private httpOptions: object  = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'usuario': 'usuario2'
    })
  
  };
  constructor(private http: HttpClient) {}

  public async getServiceFromTo( fechaDesde: string, fechaHasta: string): Promise<any[]> {
    const fechaDesdeCadena: string = fechaDesde.replace(/-/gi, '');
    const fechaHastaCadena: string = fechaHasta.replace(/-/gi, '');
    const requestObj =  {"fechaDesdeCadena":fechaDesdeCadena, "fechaHastaCadena":fechaHastaCadena}; 

    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async getServiceByPatientId(idPatient: string): Promise<any[]> {
    const requestObj =  {"idFichaClinica":{"idCliente":{"idPersona":idPatient}}};
    
    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }
  
  public async getServiceByFisioId(idFisioterapeuta: string): Promise<any[]> {
    const requestObj =  {"idEmpleado":{"idPersona":idFisioterapeuta}};
    
    const urlApi:string = `${this.api}?ejemplo=${encodeURIComponent(JSON.stringify(requestObj))}`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }

  public async getDetailServiceById(id: number): Promise<any[]> {
    const urlApi:string = `${this.api}/${id}/detalle`;
    const { lista } = await this.http.get<any>(urlApi).toPromise();
    return lista;
  }


  public async getAllDetailService(): Promise<any[]> {
    const { lista } = await this.http.get<any>(this.api).toPromise();
    return lista;
  }
  public async getAllFicha(): Promise<any[]> {
    const { lista } = await this.http.get<any>(this.apiFicha).toPromise();
    return lista;
  }
  
  public async createFacturaCabecera(obs:string, idFichaClinica:number ): Promise<any> {
    const requestObj:Object = {
        "idFichaClinica": {
            "idFichaClinica":idFichaClinica
            },
        "observacion":obs
    };
    const result = await this.http.post<any>(this.api, requestObj, this.httpOptions).toPromise();
    return result;
  }

  public async createFacturaDetalle(cant:number, idPresentacionProducto:number,idServicio:number ): Promise<any> {
    const requestObj:Object = {
        "cantidad": cant,
        "idPresentacionProducto":{
            "idPresentacionProducto":idPresentacionProducto
        },
        "idServicio":{
            "idServicio":idServicio
        }
    };
    const result = await this.http.post<any>(this.api+"/"+idServicio+"/detalle", requestObj, this.httpOptions).toPromise();
    return result;
  }
  public async getAllProducts(): Promise<any[]> {
    const { lista } = await this.http.get<any>(this.urlApiProduct).toPromise();
  
    return lista;
  }

}
