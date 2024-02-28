package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Category;
import com.Retails.POS.Services.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;

    @GetMapping(value = "/category/")
    public ResponseEntity<List<Category>> getCategory(){
        List<Category> categoryList = categoryServices.getAllCateogry();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping(value = "/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        Category category = categoryServices.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping(value = "/category/")
    public ResponseEntity<String> saveCategory(@RequestBody Category category){
        // Set createdTime to current time
        category.setCreatedTime(new Date());
        categoryServices.saveCateogry(category);
        return ResponseEntity.ok(category.getId());
    }

    @GetMapping(value = "/category/search")
    public ResponseEntity<List<Category>>  getCategoryByName(@RequestParam(name = "category") String category){
        List<Category> categoryList=categoryServices.searchByCategory(category);
        return ResponseEntity.ok(categoryList);
    }

    @PutMapping(value = "/category/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category, @PathVariable String id){
        Category existingCategory = categoryServices.getCategoryById(id);
        if (existingCategory != null) {
            // Update existingCategory fields with category fields
            if (category.getCategory()!=null){
                existingCategory.setCategory(category.getCategory());
            }
            if (category.getCategoryImage()!=null) {
                existingCategory.setCategoryImage(category.getCategoryImage());
            }
            if (category.getUserId()!=null) {
                existingCategory.setUserId(category.getUserId());}
            // Update updatedTime to current time
            existingCategory.setUpdatedTime(new Date());
            Category updatedCategory = categoryServices.saveCateogry(existingCategory);
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable String id){
        categoryServices.deleteCategory(id);
        return ResponseEntity.ok("Ok");
    }
}
