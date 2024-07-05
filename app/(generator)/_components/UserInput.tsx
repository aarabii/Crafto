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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import MetaIcon from "@/components/Icons/Meta";
import MistralIcon from "@/components/Icons/Mistral";
import GoogleIcon from "@/components/Icons/Google";

import { SelectItemContent } from "./SelectItemContent";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { generate } from "@/app/action";

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const userValues = `
    UserInput: ${values.content}
    AccountType: ${values.accountType}
    Type: ${values.type}
    Tone: ${values.tone}
    Emojies: ${values.emojies}
    `;

    try {
      const { data } = await generate(userValues, values.model, values.temp);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6 space-y-8"
        >
          <fieldset className="grid gap-6 rounded-lg border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="text-md font-medium -ml-1 px-1">
              Model Settings
            </legend>
            <div className="grid gap-3">
              {/* Model */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
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
                          <SelectItemContent
                            IconComponent={MetaIcon}
                            name="LLaMA3"
                            size="8B"
                          />
                        </SelectItem>
                        <SelectItem value="llama3-70b-8192">
                          <SelectItemContent
                            IconComponent={MetaIcon}
                            name="LLaMA3"
                            size="70B"
                          />
                        </SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">
                          <SelectItemContent
                            IconComponent={MistralIcon}
                            name="Mixtral"
                            size="8x7B"
                          />
                        </SelectItem>
                        <SelectItem value="gemma-7b-it">
                          <SelectItemContent
                            IconComponent={GoogleIcon}
                            name="Gemma"
                            size="7B"
                          />
                        </SelectItem>
                        <SelectItem value="gemma2-9b-it">
                          <SelectItemContent
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

              {/* Temp */}
              <FormField
                control={form.control}
                name="temp"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center justify-center">
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-accent">
                              <Info className="w-4 h-4 cursor-pointer" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm p-4 rounded-lg shadow-sm"
                          >
                            <p className="text-sm text-accent">
                              The temperature of the model. Higher values
                              generate more creative text, but may also be less
                              coherent.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span>{value}</span>
                    </FormLabel>
                    <Slider
                      defaultValue={[1]}
                      min={1}
                      max={2}
                      step={0.1}
                      onValueChange={(val) => onChange(val[0])}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          {/* User Settings  */}
          <fieldset className="grid gap-6 rounded-lg border p-4 bg-background/10 backdrop-blur-sm">
            <legend className="text-md font-medium -ml-1 px-1">
              Input Settings
            </legend>

            {/* About the content */}
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between pb-2">
                      About Your Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add few sentences about the content you want to generate..."
                        className="min-h-[10rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Select containes */}
            <div className="grid grid-cols-3 gap-3">
              {/* account type  */}
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Personal">
                          <SelectItemContent name="Personal" />
                        </SelectItem>
                        <SelectItem value="Business">
                          <SelectItemContent name="Business" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generate Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Generate type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bio">
                          <SelectItemContent name="Bio" />
                        </SelectItem>
                        <SelectItem value="Description">
                          <SelectItemContent name="Description" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* tone  */}
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Professional">
                          <SelectItemContent name="Professional" />
                        </SelectItem>
                        <SelectItem value="Casual">
                          <SelectItemContent name="Casual" />
                        </SelectItem>
                        <SelectItem value="Friendly">
                          <SelectItemContent name="Friendly" />
                        </SelectItem>
                        <SelectItem value="Formal">
                          <SelectItemContent name="Formal" />
                        </SelectItem>
                        <SelectItem value="Funny">
                          <SelectItemContent name="Funny" />
                        </SelectItem>
                        <SelectItem value="Sarcastic">
                          <SelectItemContent name="Sarcastic" />
                        </SelectItem>
                        <SelectItem value="thoughtful">
                          <SelectItemContent name="thoughtful" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Emojies */}

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojies"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-sm mr-4">Add emojies</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!my-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <Button className="rounded" type="submit">
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};
