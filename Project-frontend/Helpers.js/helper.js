export const dataItems = () => {
  const menuListFirst = [
    { name1: "Today", icon1: "calendar" },
    { name1: "Tomorrow", icon1: "calendar" },
    { name1: "Next week", icon1: "calendar" },
    { name1: "Pick a date", icon1: "calendar" },
  ];

  return (
    <View style={{ right: 100 }}>
      <MenuProvider style={{ width: 250 }}>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                top: -40,
              },
            }}
          ></MenuTrigger>

          <MenuOptions>
            <FlatList
              data={menuListFirst}
              keyExtractor={(item) => item.id}
              style={{ height: 200 }}
              renderItem={({ item }) => (
                <MenuOption
                  onSelect={() => alert(item.name1)}
                  customStyles={{
                    optionWrapper: {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  }}
                >
                  <Text>{item.name1}</Text>
                  <AntDesign name={item.icon1} size={42} />
                </MenuOption>
              )}
            />
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </View>
  );
};
