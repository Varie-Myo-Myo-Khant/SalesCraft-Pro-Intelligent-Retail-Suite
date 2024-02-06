package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Category;

import com.Retails.POS.Services.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/category")
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;

    @GetMapping(value = "/")
    public ResponseEntity<List<Category>> getCategory(){
        List<Category> categoryList = categoryServices.getAllCateogry();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        Category category = categoryServices.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<String> saveCategory(@RequestBody Category category){
        categoryServices.saveCateogry(category);
        return ResponseEntity.ok(category.get_id());
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable String id){
        category.set_id(id);
        categoryServices.saveCateogry(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable String id){
        categoryServices.deleteCategory(id);
        return ResponseEntity.ok("Ok");
    }
}
