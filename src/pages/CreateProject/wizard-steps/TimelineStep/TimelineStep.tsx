import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Calendar, Clock, Lightning } from "phosphor-react";
import {
  type IWizardStepsProps,
  type IWizardStepRef,
} from "../Wizard-steps-interface";
import { Header } from "../../components";
import { useWizardStore } from "@/stores";
import { updateProject } from "@/api/create-project/create.project";
import type { TimelineStepData } from "@/stores/wizard";

const timelineOptions = [
  {
    id: "asap",
    name: "As soon as possible",
    description: "Within 1-2 weeks",
    icon: Lightning,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "month",
    name: "Within a month",
    description: "2-4 weeks",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "flexible",
    name: "I'm flexible",
    description: "1-3 months",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
];

const TimelineStep = forwardRef<IWizardStepRef, IWizardStepsProps>(
  ({ title, subTitle }, ref) => {
    const [selectedTimeline, setSelectedTimeline] = useState("");
    const [preferredDate, setPreferredDate] = useState("");

    // Wizard store
    const { data, setTimelineData } = useWizardStore();

    // Load existing data from store
    useEffect(() => {
      if (data.timeline) {
        setSelectedTimeline(data.timeline.selectedTimeline);
        setPreferredDate(data.timeline.preferredDate || "");
      }
    }, [data.timeline]);

    const handleUpdateTimeline = async (): Promise<boolean> => {
      try {
        if (data.projectId && selectedTimeline) {
          await updateProject(data.projectId, {
            schedule_pref: "soon",
          });
          console.log("Timeline updated successfully:", selectedTimeline);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating timeline:", error);
        return false;
      }
    };

    const handleTimelineSelect = (timelineId: string) => {
      setSelectedTimeline(timelineId);
    };

    const handlePreferredDateChange = (date: string) => {
      setPreferredDate(date);
    };

    const validateStep = (): boolean => {
      return selectedTimeline !== "";
    };

    const getStepData = async () => {
      const stepData: TimelineStepData = {
        selectedTimeline,
        preferredDate,
      };

      // Save to wizard store
      setTimelineData(stepData);

      // Update project with timeline
      const timelineUpdated = await handleUpdateTimeline();

      return {
        data: stepData,
        success: timelineUpdated,
      };
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      validate: validateStep,
      getData: getStepData,
    }));

    return (
      <div className="max-w-2xl mx-auto">
        <Header title={title} subTitle={subTitle} />

        <div className="space-y-4">
          {timelineOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center p-2 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedTimeline === option.id
                  ? "border-[#2c74b3] bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="timeline"
                value={option.id}
                checked={selectedTimeline === option.id}
                onChange={(e) => handleTimelineSelect(e.target.value)}
                className="sr-only"
              />

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                  selectedTimeline === option.id
                    ? "bg-[#2c74b3] text-white"
                    : option.bgColor
                }`}
              >
                <option.icon
                  size={18}
                  className={
                    selectedTimeline === option.id ? "text-white" : option.color
                  }
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {option.name}
                </h3>
                <p className="text-xs text-gray-600">{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Additional Notes */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional timeline notes (optional)
          </label>
          <textarea
            value={preferredDate}
            onChange={(e) => handlePreferredDateChange(e.target.value)}
            placeholder="Any specific scheduling requirements or preferences..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#2c74b3] focus:outline-none focus:ring-0 resize-none"
            rows={3}
          />
        </div>
      </div>
    );
  }
);

TimelineStep.displayName = "TimelineStep";

export default TimelineStep;
