"use client";

import { ChangeEvent } from "react";
import styles from "./VolumeRange.module.css";

type VolumeType = {
  max: number;
  min: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function VolumeRange({ max, min, step, value, onChange }: VolumeType) {

  return (
    <input
    className={styles.volumeInput}
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
}
