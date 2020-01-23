import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface SepomexResponse {
  error: boolean;
  code_error: number;
  error_message: any;
  response: { estado?: []; colonia?: []; municipios?: [] };
}

@Injectable({
  providedIn: "root"
})
export class MexicoService {
  private configUrl = "https://api-sepomex.hckdrk.mx/query/";

  public getStates(): Promise<SepomexResponse> | any {
    return this.http.get(`${this.configUrl}get_estados`);
  }

  public getMunicipalities(state: string): Promise<SepomexResponse> | any {
    return this.http.get(`${this.configUrl}get_municipio_por_estado/${state}`);
  }

  public getColonies(municipality: string): Promise<SepomexResponse> | any {
    return this.http.get(
      `${this.configUrl}get_colonia_por_municipio/${municipality}`
    );
  }

  constructor(private http: HttpClient) {}
}
