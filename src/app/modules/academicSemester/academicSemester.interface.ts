import { ObjectId } from "mongodb";

export type TMonth = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";

export type TAcademicSemesterName = "Autumn" | "Fall" | "Summer"

export type TAcademicSemesterCode = "01" | "02" | "03"

interface TAcademySemester {
  name: TAcademicSemesterName;
  year: string;
  code: TAcademicSemesterCode;
  startMonth: TMonth;
  endMonth: TMonth;
  type: ObjectId;
}

export default TAcademySemester;