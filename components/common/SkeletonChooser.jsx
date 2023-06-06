import React from "react";
import { SIZES } from "../../constants";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";

const SkeletonChooser = ({ type }) => {
  return (
    <>
      {type === "gainerLosers" && (
        <SkeletonPlaceholder borderRadius={16}>
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={170}
              height={170}
              marginRight={SIZES.md}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={170}
              height={170}
            ></SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
      {type === "watchList" && (
        <SkeletonPlaceholder borderRadius={16}>
          <SkeletonPlaceholder.Item flexDirection="column">
            <SkeletonPlaceholder.Item
              width={"100%"}
              height={80}
              marginVertical={SIZES.sm}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={"100%"}
              height={80}
              marginBottom={SIZES.sm}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={"100%"}
              height={80}
            ></SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
      {type === "stockDetails" && (
        <SkeletonPlaceholder borderRadius={8}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              height={20}
              width={40}
              marginBottom={6}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              height={30}
              width={250}
              marginBottom={6}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              height={20}
              width={80}
              marginBottom={6}
            ></SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginVertical={6} flexDirection="row">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  height={40}
                  width={60}
                  marginRight={6}
                ></SkeletonPlaceholder.Item>
              ))}
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              height={220}
              width={"100%"}
              marginVertical={8}
            ></SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
    </>
  );
};

export default SkeletonChooser;
