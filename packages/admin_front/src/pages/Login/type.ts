import { Rule } from "antd/lib/form";

export interface ValidateFunction {
  (rule: Rule, value: any, callback: (error?: string) => void, formData: any): void;
}