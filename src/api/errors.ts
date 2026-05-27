import { AxiosError } from "axios";

export type AppErrorCode =
  | "network_error"
  | "unauthorized"
  | "validation_error"
  | "not_found"
  | "conflict"
  | "payload_too_large"
  | "external_service_error"
  | "service_unavailable"
  | "server_error"
  | "unknown_error";

export class AppError extends Error {
  code: AppErrorCode;
  status?: number;
  details?: unknown;

  constructor(message: string, code: AppErrorCode, status?: number, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function normalizeApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { message?: string; error?: string; detail?: string; details?: unknown }
      | undefined;
    const message =
      data?.message ??
      data?.error ??
      data?.detail ??
      error.message ??
      "Nao foi possivel concluir a acao.";

    if (!error.response) {
      return new AppError("Sem conexao com o servidor.", "network_error", status, data);
    }
    if (status === 401) {
      return new AppError(message || "Login invalido. Confira e tente novamente.", "unauthorized", status, data);
    }
    if (status === 404) {
      return new AppError(message, "not_found", status, data);
    }
    if (status === 409) {
      return new AppError(message, "conflict", status, data);
    }
    if (status === 413) {
      return new AppError("Arquivo maior que 10 MB.", "payload_too_large", status, data);
    }
    if (status === 502) {
      return new AppError(
        "IA temporariamente indisponivel. Tente novamente em alguns minutos.",
        "external_service_error",
        status,
        data,
      );
    }
    if (status === 503) {
      return new AppError(message || "Servico temporariamente indisponivel.", "service_unavailable", status, data);
    }
    if (status && status >= 400 && status < 500) {
      return new AppError(message, "validation_error", status, data);
    }
    if (status && status >= 500) {
      return new AppError("Servidor indisponivel agora.", "server_error", status, data);
    }
  }

  return new AppError("Erro inesperado.", "unknown_error", undefined, error);
}
