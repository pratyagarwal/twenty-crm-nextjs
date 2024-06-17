"use client";
import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FileUploadIcon, TrashIcon, UploadIcon } from "~lib/assets";
import { AppTheme, themeStore } from "~lib/theme";
import { cn } from "~lib/utils";
import { authStore } from "~modules/common/stores/auth-store";
import { IWorkspace } from "~modules/common/types";

export const Page: FC = () => {
  const { theme } = themeStore();
  const { workspace, setWorkspace } = authStore();
  const isFirstRender = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<Partial<IWorkspace>>(workspace);

  const handleUpload = useCallback((file: File | undefined) => {
    if (file) {
      setFormState((state) => {
        return { ...state, profile: file };
      });
    }
  }, []);

  const handleDeleteUpload = useCallback(() => {
    setFormState((state) => {
      return { ...state, profile: null };
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setWorkspace({
        name: formState.name,
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [formState.id, formState.name, setWorkspace]);

  useEffect(() => {
    setWorkspace({
      profile: formState.profile,
    });
  }, [formState.profile, setWorkspace]);

  return (
    <div
      className={
        "ml-[40vw] flex h-full w-[60vw] justify-start transition-all duration-200"
      }>
      <div
        className={
          "my-3 mr-3 h-[calc(100%-24px)] w-full rounded-md border border-solid border-border100 bg-bodyPrimary pl-2"
        }>
        <div className={"flex w-full flex-col gap-8 p-8"}>
          <h2 className={"text-[16px] font-semibold text-text400"}>General</h2>
          <div>
            <h3 className={"mb-4 text-[13px] font-semibold"}>Picture</h3>
            <div className={"flex flex-row gap-2"}>
              <div
                className={
                  "relative flex h-[66px] w-[66px] items-center justify-center overflow-hidden rounded-md bg-bodySecondary"
                }>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => handleUpload(e?.target?.files?.[0])}
                  style={{ display: "none" }}
                />
                {formState.profile ? (
                  <Image
                    width={"66"}
                    height={"66"}
                    src={URL.createObjectURL(formState.profile)}
                    className={"absolute left-0 top-0 h-[66px] w-[66px]"}
                    alt={"user-profile"}
                  />
                ) : null}
                <FileUploadIcon
                  size={"16"}
                  color={
                    [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                      ? "#B3B3B3"
                      : "#666666"
                  }
                />
              </div>
              <div>
                <div className={"ml-4 flex flex-row gap-2"}>
                  <button
                    onClick={() => inputRef?.current?.click()}
                    className={
                      "flex h-[32px] w-[200px] flex-row items-center gap-2 rounded border border-solid border-border100 px-2 hover:bg-bgHover100"
                    }>
                    <UploadIcon
                      size={"14"}
                      color={
                        [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                          ? "#B3B3B3"
                          : "#666666"
                      }
                    />
                    <p className={"text-[13.4px] font-[500] text-text100"}>Upload</p>
                  </button>
                  <button
                    onClick={handleDeleteUpload}
                    disabled={!formState.profile}
                    className={cn(
                      "flex h-[32px] w-[200px] flex-row items-center gap-2 rounded border border-solid border-border100 px-2 hover:bg-bgHover100",
                      formState.profile
                        ? "opacity-100"
                        : "pointer-events-none opacity-45",
                    )}>
                    <TrashIcon
                      size={"14"}
                      color={
                        [AppTheme.LIGHT, AppTheme.PURPLE_LIGHT].includes(theme)
                          ? "#B3B3B3"
                          : "#666666"
                      }
                    />
                    <p className={"text-[13.4px] text-text100"}>Delete</p>
                  </button>
                </div>
                <p className={"ml-2 mt-5 text-[11px] text-text300"}>
                  We support your best PNGs, JPEGs and GIFs portraits under 10MB
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className={"mb-4 text-[13px] font-semibold"}>Name</h3>
            <p className={"mt-3 text-[13px] text-text400"}>Name of your workspace</p>
            <div className={"mt-3 flex flex-row gap-4"}>
              <div className={"flex flex-col gap-1"}>
                <label className={"text-[11px] font-semibold text-text300"}>Name</label>
                <input
                  value={formState.name}
                  onChange={(e) => {
                    setFormState((state) => {
                      return { ...state, name: e.target.value };
                    });
                  }}
                  type={"text"}
                  placeholder={"My Personal Workspace"}
                  className={
                    "h-8 w-[512px] rounded border border-solid border-border100 bg-bgHover100 p-2 text-[13px] text-text100 outline-none"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
