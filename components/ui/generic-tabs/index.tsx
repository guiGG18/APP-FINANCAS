import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getFilteredErrorsArray } from './utils/getFilteredErrors';
interface TabItem {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

interface GenericTabsProps {
  tabs: TabItem[];
  fieldNames?: string[];
}

interface FormInputs {
  nome: string;
  expenseAmount: string;
  category: string;
  paymentMethod: string;
  account: string;
}

export function GenericTabs({ tabs }: GenericTabsProps) {

  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);
  const { control } = useFormContext<FormInputs>();
  const { errors: formErrorsFromControl, isSubmitting } = useFormState({
    control,
  });

  const filteredErrors = useMemo(
    () => getFilteredErrorsArray(tabs, formErrorsFromControl),
    [tabs, JSON.stringify(formErrorsFromControl)]);

  useEffect(() => {
    if (filteredErrors.length === 0 || !isSubmitting) return;
    setActiveTab(filteredErrors[0]?.name);
  }, [JSON.stringify(formErrorsFromControl), isSubmitting]);

  return (
    <View className="">
      <View className="flex-row gap-2 mb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.id)}
              style={[
                styles.tabButton,
                isActive ? styles.activeTab : styles.inactiveTab
              ]}
            >
              <Text
                className={`text-xs font-medium ${isActive ? 'text-white' : 'text-[#8C7A6A]'
                  }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content (Conteúdo) */}
      <View className="min-h-[140px] mt-2">
        {tabs.map((tab) => (
          <View
            key={tab.id}
            style={{ display: activeTab === tab.id ? 'flex' : 'none' }}
          >
            {tab.render()}
          </View>
        ))}

        {filteredErrors.length > 0 && (
          <View className="w-full flex flex-row justify-around">
            {filteredErrors.map(({ name, error }) =>
              error ? (
                <Text
                  key={name}
                  style={{
                    color: "#ef4444",
                    fontSize: 11,
                    marginBottom: 4,
                    fontWeight: "600",
                  }}
                >
                  {String(error.message)}
                </Text>
              ) : null
            )}
          </View>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#D8825C',
    elevation: 4,               // Sombra Android
    shadowColor: '#000',        // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  inactiveTab: {
    backgroundColor: '#FFF5E9',
  },
});
