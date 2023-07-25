	// Use reflection to loop over the struct fields and update if value is "Hello"
	reflectValue := reflect.ValueOf(&myStruct).Elem()
	reflectType := reflectValue.Type()

	for i := 0; i < reflectValue.NumField(); i++ {
		fieldValue := reflectValue.Field(i)
		if fieldValue.Kind() == reflect.String && fieldValue.String() == "Hello" {
			newValue := "Updated"
			fieldValue.SetString(newValue)
		}
	}
