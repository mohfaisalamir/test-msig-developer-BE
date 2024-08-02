package com.msig.phonebookApp.controller;

import com.msig.phonebookApp.dto.request.SearchContactRequest;
import com.msig.phonebookApp.dto.response.CommonResponse;
import com.msig.phonebookApp.entity.Contact;
import com.msig.phonebookApp.sevice.ContactService;
import com.msig.phonebookApp.utils.PagingUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final ContactService contactService;
    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }
    @GetMapping
    public ResponseEntity<CommonResponse<List<Contact>>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        CommonResponse<List<Contact>> response = CommonResponse.<List<Contact>>builder()
                .message("Successfully retrieved contacts")
                .statusCode(HttpStatus.OK.value())
                .data(contacts)
                .build();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{name}")
    public ResponseEntity<CommonResponse<List<Contact>>> getContactsByName(@PathVariable String name) {
        List<Contact> contacts = contactService.getContactsByName(name);
        CommonResponse<List<Contact>> response = CommonResponse.<List<Contact>>builder()
                .message("Successfully retrieved contacts")
                .statusCode(HttpStatus.OK.value())
                .data(contacts)
                .build();
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{name}")
    public ResponseEntity<CommonResponse<Contact>> updateContact(
            @PathVariable String name ,
            @RequestBody Contact contact) {
        //contact.setName(name); // Ensure the name is set
        Contact updatedContact = contactService.updateContact(name, contact);
        CommonResponse<Contact> response = CommonResponse.<Contact>builder()
                .message("Successfully updated contact")
                .statusCode(HttpStatus.OK.value())
                .data(updatedContact)
                .build();
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteContact(@PathVariable String name) {
         contactService.deleteContact(name);

        CommonResponse<String> response = CommonResponse.<String>builder()
                .message("Successfully deleted contact")
                .statusCode(HttpStatus.OK.value())
                .data("Contact with name '" + name + "' has been deleted.")
                .build();
        return ResponseEntity.ok(response);
    }
}
