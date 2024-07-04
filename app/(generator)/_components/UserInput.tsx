"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import MetaIcon from "@/components/Icons/Meta";
import MistralIcon from "@/components/Icons/Mistral";
import GoogleIcon from "@/components/Icons/Google";

import { SelectItemModelContent } from "./SelectItemModelContent";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  temp: z
    .number()
    .min(0, "Temp must be greater than 0")
    .max(100, "Temp must be atmost to 100"),

  content: z
    .string()
    .min(50, "Content shlould be at least 50 characters")
    .max(500, "Content should exceed 500 characters"),

  accountType: z.enum(["Personal", "Business"], {
    errorMap: () => ({
      message: "Type is required and should be either Personal or Business",
    }),
  }),

  type: z.enum(["Bio", "Description"], {
    errorMap: () => ({
      message: "Type is required and should be either Bio or Description",
    }),
  }),

  tone: z.enum(
    [
      "Professional",
      "Casual",
      "Friendly",
      "Formal",
      "Funny",
      "Sarcastic",
      "thoughtful",
    ],
    {
      errorMap: () => ({
        message:
          "Tone is required and should be either Professional, Casual, Friendly, Formal, Funny, Sarcastic or thoughtful",
      }),
    }
  ),

  emojies: z.boolean(),
});

export const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      model: "llama3-8b-8192",
      temp: 1,
      content: "",
      accountType: "Personal",
      type: "Description",
      tone: "Professional",
      emojies: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="relative flex flex-col items-start gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6 space-y-8"
        >
          <fieldset className="grid gap-6 rounded-lg border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="text-lg font-semibold">Settings</legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  // Model
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="llama3-8b-8192">
                          <SelectItemModelContent
                            IconComponent={MetaIcon}
                            name="LLaMA3"
                            size="8B"
                          />
                        </SelectItem>
                        <SelectItem value="llama3-70b-8192">
                          <SelectItemModelContent
                            IconComponent={MetaIcon}
                            name="LLaMA3"
                            size="70B"
                          />
                        </SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">
                          <SelectItemModelContent
                            IconComponent={MistralIcon}
                            name="Mixtral"
                            size="8x7B"
                          />
                        </SelectItem>
                        <SelectItem value="gemma-7b-it">
                          <SelectItemModelContent
                            IconComponent={GoogleIcon}
                            name="Gemma"
                            size="7B"
                          />
                        </SelectItem>
                        <SelectItem value="gemma2-9b-it">
                          <SelectItemModelContent
                            IconComponent={GoogleIcon}
                            name="Gemma2"
                            size="9B"
                          />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Generate</Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
